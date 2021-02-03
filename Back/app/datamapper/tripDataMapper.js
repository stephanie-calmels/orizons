const commentDataMapper = require('../datamapper/commentDataMapper');
const client = require('./client');
const stepDataMapper = require('./stepDataMapper');

const tripDataMapper = {
    async getAllTrips() {
        const result = await client.query("SELECT * FROM trip_with_duration_status");

        return result.rows;
    },

    async getTripById(idTrip) {
        //1 - les informations du voyage
        const result = await client.query("SELECT * FROM trip_with_duration_status WHERE id=($1)", [idTrip]);
        //2 - les informations de l'auteur

        //const result = await client.query("SELECT * FROM trip_step WHERE id_trip = $1", [idTrip]);

        if (result.rowCount == 0) {
            return null;
        }
        console.log(result.rows);
        return result.rows[0];
    },

    async getTripByMember(memberId) {
        const result = await client.query(`SELECT * FROM trip_by_member WHERE id = $1`, [memberId]);
        return result.rows[0];

    },

    async createTrip(newTrip) {
        const trip = await client.query(`INSERT INTO "trip"("title", "summary", "departure_date", "arrival_date", "member_id", "cover_trip") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
                newTrip.title,
                newTrip.summary,
                newTrip.departure_date,
                newTrip.arrival_date,
                newTrip.member_id,
                newTrip.cover_picture //cover_picture
                //country pays -->table m2m
                //categories // tableau dans m2m
            ]);

        console.log(newTrip.country_code, '----------------------------------')
        const country = await client.query(`SELECT "id" FROM "country" WHERE "code" = $1`, [newTrip.country_code])
        await client.query(`INSERT INTO "_m2m_trip_country"("trip_id", "country_id") VALUES ($1, $2)`, [trip.rows[0].id, country.rows[0].id]);


        for (let category of newTrip.categories) {
            await client.query(`INSERT INTO "_m2m_trip_category"("trip_id", "category_id") VALUES ($1, $2)`, [trip.rows[0].id, category.id]);

        }

        return this.getTripById(trip.rows[0].id);
    },

    async updateAllTrip() {
        const result = await client.query("");
    },

    async updateOneTrip(tripId, tripInfos) {
        const result = await client.query(`UPDATE "trip" SET "title" = $1, "summary" = $2, "departure_date" = $3, "arrival_date" = $4, "cover_trip" = $5 WHERE "id" = $6`,
            [
                tripInfos.title,
                tripInfos.summary,
                tripInfos.departure_date,
                tripInfos.arrival_date,
                tripInfos.cover_picture,
                tripId
            ]);

        const country = await client.query(`SELECT "id" FROM "country" WHERE "code" = $1`, [tripInfos.country_code]);
        console.log(country.rows[0].id);

        const searchedTripCountry = await client.query(`SELECT * FROM "_m2m_trip_country" tc WHERE tc.trip_id = $1 AND tc.country_id = $2`,
            [
                tripId,
                country.rows[0].id
            ])
        //searchedTripCountry = searchedTripCountry.result.rows[0]
        console.log(searchedTripCountry.rows[0])
        if (searchedTripCountry.rows[0]) {
            // if trip = true, we check if the pair is linked to a step.
            if (searchedTripCountry.rows[0].trip == true) {
                // if the pair exists, we check if the pair is usefull for the steps
                const stepCheck = await client.query(`SELECT "id" FROM "step" WHERE "trip_id" = $1, "country_id" = $2`, [
                    searchedTripCountry.rows[0].trip_id,
                    searchedTripCountry.rows[0].country_id
                ])
                if (stepCheck) {
                    //if it is usefull we put trip = true to trip = false
                    await client.query(`UPDATE "_m2m_trip_country" SET "trip" = $1 WHERE "id" = $2`,
                        [false, searchedTripCountry.result.rows[0].id])
                } else {
                    // if the old pair is usless with the steps, we delete it
                    await client.query(`DELETE FROM "_m2m_trip_country" WHERE "id" = $1`,
                        [searchedTripCountry.result.rows[0].id])
                }


            }

        } else {
            // we delete the old pair
            await client.query(`DELETE FROM "_m2m_trip_country" WHERE "trip_id" = $1 AND "trip" = $2`,
                [tripId,
                    true
                ])
            // if the pair doesn't exist, we create de pair

            await client.query(`INSERT INTO "_m2m_trip_country"("trip_id", "country_id") VALUES ($1, $2)`,
                [tripId, country.rows[0].id]);


        }

        return this.getTripById(tripId)


    },

    async deleteAllTrip() {
        const result = await client.query("");
    },

    async deleteOneTrip(tripId) {
        const resultComment = await client.query(`
                            SELECT * FROM "comment"
                            WHERE "trip_id" = $1 `, [tripId]);
        if (resultComment.rowCount != 0) {
            await commentDataMapper.deleteAllCommentByTrip(tripId)
        }

        const result = await client.query(`
                            SELECT * FROM step WHERE trip_id = $1 `, [tripId])

        if (result.rowCount != 0) {
            for (let element of result.rows) {
                let stepId = element.id;
                await stepDataMapper.deleteOneStep(stepId);

            }

        }
        await client.query(`DELETE FROM _m2m_trip_country WHERE trip_id = $1 `, [tripId]);
        await client.query(`DELETE FROM _m2m_trip_category WHERE trip_id = $1 `, [tripId]);
        await client.query(`DELETE FROM trip WHERE id = $1 `, [tripId]);
        const message = "supprimé";
        return message;



    },


};

module.exports = tripDataMapper;