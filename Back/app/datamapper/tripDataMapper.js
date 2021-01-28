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
        const result = await client.query("INSERT INTO trip(title, summary, departure_date, arrival_date, member_id) VALUES ($1, $2, $3, $4, $5)RETURNING *",
            [
                newTrip.title,
                newTrip.summary,
                newTrip.departure_date,
                newTrip.arrival_date,
                newTrip.member_id
            ]);
        return result.rows[0];
    },

    async updateAllTrip() {
        const result = await client.query("");
    },

    async updateOneTrip(idTrip) {
        const result = await client.query("");
    },

    async deleteAllTrip() {
        const result = await client.query("");
    },

    async deleteOneTrip(tripId) {
        const result = await client.query(`SELECT * FROM step WHERE trip_id = $1`, [tripId])
        //console.log(result.rows)
        if (result.rowCount != 0) {
            for (let element of result.rows) {
                let stepId = element.trip_id;
                console.log(stepId);
                await stepDataMapper.deleteOneStep(stepId);
                console.log("prout", stepId)
            }

        }
        //await client.query(`DELETE FROM trip WHERE id = $1 `, [tripId]);
        const message = "supprimé"
        return message



    },


};

module.exports = tripDataMapper;