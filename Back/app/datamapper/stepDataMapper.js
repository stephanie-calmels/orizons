const client = require('./client');
const tripDataMapper = require('./tripDataMapper');
const tripStepDataMapper = require('./tripStepDataMapper')

const stepDataMapper = {
    async getAllStep() {
        const result = await client.query("SELECT * FROM step");
        return result.rows;
    },

    async getOneStep(stepId) {
        const result = await client.query(`SELECT * FROM "step_by_step" WHERE "step_id" = $1`, [stepId])

        return result.rows[0]
    },

    async createStep(newStep) {
        let nbStep
        // 1 - search biggest number_step in this trip to calculte next number
        const steps = await client.query('SELECT * FROM step WHERE trip_id = $1 ORDER BY number_step DESC LIMIT 1', [newStep.trip_id]);

        if (steps.rowCount == 0) {
            nbStep = 1;
        } else {
            nbStep = steps.rows[0].number_step + 1;
        }
        // 2 - search if the pair trip/country exists en table m2m
        const idCountry = await client.query(`SELECT "id" FROM "country" WHERE "code" = $1`, [newStep.country_code]);


        const tripCountry = await client.query(`SELECT "_m2m_trip_country"."id" FROM "_m2m_trip_country" JOIN "country" ON "country"."id" = "_m2m_trip_country"."country_id" WHERE "_m2m_trip_country"."trip_id" = $1 AND "_m2m_trip_country"."country_id" = $2`,
            [newStep.trip_id,
                idCountry.rows[0].id
            ])


        if (!tripCountry.rows[0]) {

            await client.query(`INSERT INTO "_m2m_trip_country"("trip_id", "country_id", "trip") VALUES ($1, $2, $3)`, [newStep.trip_id, idCountry.rows[0].id, false]);

        }

        // 3 - Insert new step
        const result = await client.query('INSERT INTO step(longitude, latitude, title, number_step, content, trip_id, country_id, step_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                newStep.longitude, //OK
                newStep.latitude, //OK
                newStep.title, //OK
                nbStep, //1 étape par jour devient un champ calculé (sur l'ordre décroissant)
                newStep.content, //OK
                //newStep.member_id, // j'aille le créer en ai je basoin -- en fait faudrait le supprimer
                //newStep.localisation_id, //// y en n'a plus besoin en fait si pour la jointure avec la table country à modifier
                newStep.trip_id,
                //newStep.step_date --> step_date add date_stamp de l'étape
                //add country
                idCountry.rows[0].id, //3 x A-Z0-9 ajouter s'il n'y est pas encore dans la m2m
                newStep.step_date


            ]);
        // 4 - Insert step's photos
        let picture = newStep.pictures;

        let counter = 1;
        for (let index = 0; index < picture.length; index++) {

            await client.query(`INSERT INTO "photo"("title", "url", "step_id") VALUES ($1, $2, $3)`,
                [`${result.rows[0].title}_${counter++}`,
                    picture[index],
                    result.rows[0].id
                ])

        }
        // 5 - We return the new datas
        //const theStep = await this.getOneStep(result.rows[0].id);
        return newStep.trip_id

    },
    async updateOneStep(stepId, stepInfos) {

        // searching country's id
        const country = await client.query(`SELECT id FROM "country" WHERE "code" = $1`, [stepInfos.country_code])

        // searching the old country id of the step
        const oldStepCountry = await client.query(`SELECT "country_id" FROM "step" WHERE "id" = $1`, [stepId])

        // update datas in step table
        await client.query(`UPDATE step SET longitude = $1, latitude = $2, title = $3, content = $4, step_date = $5, country_id = $6 WHERE (id= $7)`,
            [stepInfos.longitude,
                stepInfos.latitude,
                stepInfos.title,
                stepInfos.content,
                stepInfos.step_date,
                country.rows[0].id,
                stepId
            ])

        // if the old country's step is different of the new country's id
        if (oldStepCountry.rows[0].country_id != country.rows[0].id) {
            await client.query(`UPDATE _m2m_trip_country SET country_id = $1 WHERE trip_id = $2 AND country_id = $3`,
                [country.rows[0].id,
                    stepInfos.step_id,
                    oldStepCountry.rows[0].country_id
                ])
        }
        // update photos
        let pictures = stepInfos.pictures;
        for (let index = 0; index < pictures.length; index++) {
            const checkPicture = await client.query('SELECT * FROM photo WHERE url = $1', [pictures[index]]);
            if (!checkPicture) {
                await client.query(`INSERT INTO "photo"("title", "url", "step_id") VALUES ($1, $2, $3)`,
                    [`${result.rows[0].title}_${counter++}`,
                        pictures[index],
                        result.rows[0].id
                    ])
            }
        };
        let oldPictures = await client.query('SELECT * FROM photo WHERE step_id = $1', [stepId]);
        oldPictures = oldPictures.rows
        for (const pictures of oldPictures) {
            const checkPicture = await client.query('SELECT * FROM photo WHERE url = $1', [pictures.url]);
            if (!checkPicture) {
                await client.query(`DELETE FROM photo WHERE url = $1`, [pictures.url]);
            }
        }

        return stepInfos.trip_id;


    },

    async getStepByTripId(tripId) {
        const result = await client.query('SELECT * FROM step_photo WHERE trip_id = $1', [tripId]);
        return result.rows;
    },

    async deleteOneStep(stepId) {
        const verify = await client.query(`SELECT * FROM photo WHERE step_id = $1`, [stepId]);

        if (verify.rowCount != 0) {
            await client.query(`DELETE FROM photo WHERE step_id = $1`, [stepId]);

        }

        // dégader le pays si plus besoin
        //check dans les étapes si le pays est toujours concerné
        // on récupère le tripId
        console.log('test1');
        let tripId = await client.query(`SELECT trip_id, country_id FROM step WHERE id = $1`, [stepId]);
        tripId = tripId.rows[0]
        console.log('test2');
        // je vérifie dans la table step si il y a une autre étape, donc si le compte est >1 si >1 on fait rien si ==1
        console.log(tripId.trip_id);
        console.log(tripId.country_id)
        const checkSteps = await client.query(`SELECT * FROM step WHERE trip_id = $1 AND country_id = $2`, [tripId.trip_id, tripId.country_id]);
        console.log('test3');
        console.log(checkSteps.rowCount)
        if (checkSteps.rowCount == 1) {
            // si =1 on vérifie que ce n'est pas l'étape du carnet
            const checkTripCountry = await client.query(`SELECT * FROM _m2m_trip_country WHERE trip_id = $1 AND country_id = $2 AND trip = $3`, [tripId.trip_id, tripId.country_id, true]);
            // si ce n'est pas l'étape du carnet on la supprime
            console.log('test4');
            if (!checkTripCountry) {
                client.query(`DELETE FROM _m2m_trip_country WHERE trip_id = $1 AND country_id = $2 AND trip = $3`, [tripId.trip_id, tripId.country_id, false])
            }
        }

        console.log('test5');
        await client.query(`DELETE FROM step WHERE id = $1`, [stepId]);
        return tripId.trip_Id;
    }


};

module.exports = stepDataMapper; {}