const client = require('./client');

const stepDataMapper = {
    async getAllStep() {
        const result = await client.query("SELECT * FROM step");
        return result.rows;
    },

    async getOneStep(stepId) {
        console.log('choucroute')
        const result = await client.query(`SELECT * FROM "step_by_step" WHERE "step_id" = $1`, [stepId])
        console.log(result.rows[0], 'one step ????????????????')
        return result.rows[0]
    },

    async createStep(newStep) {
        let nbStep
        // 1 - search biggest number_step in this trip to calculte next number
        const steps = await client.query('SELECT * FROM step WHERE trip_id = $1 ORDER BY number_step DESC LIMIT 1', [newStep.trip_id]);
        console.log(steps.rows[0], '-------------------------------')
        if (steps.rowCount == 0) {
            nbStep = 1;
        } else {
            nbStep = steps.rows[0].number_step + 1;
        }
        console.log('nbstep', nbStep);
        // 2 - search if the pair trip/country exists en table m2m
        const tripCountry = await client.query(`SELECT tc."id" FROM "_m2m_trip_country" tc JOIN "country" ON "country"."id" = tc."country_id" WHERE tc."trip_id" = $1`, [newStep.trip_id])
        console.log("2-1");

        const idCountry = await client.query(`SELECT "id" FROM "country" WHERE "code" = $1`, [newStep.country_code])
        console.log(idCountry.rows[0])


        console.log(tripCountry.rows)
        if (!tripCountry.rows[0]) {

            await client.query(`INSERT INTO "_m2m_trip_country"("trip_id", "country_id") VALUES ($1, $2)`, [newStep.trip_id, idCountry.rows[0].id])
            console.log("2-2");

        }

        // 3 - Insert new step
        const result = await client.query('INSERT INTO step(longitude, latitude, title, number_step, content, trip_id, country_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
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
                idCountry.rows[0].id //3 x A-Z0-9 ajouter s'il n'y est pas encore dans la m2m


            ]);
        console.log('3')
        console.log(newStep.pictures, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')

        // 4 - Insert step's photos
        let counter = 1;
        for (let picture of newStep.pictures) {

            await client.query(`INSERT INTO "photo"("title", "url", "step_id") VALUES ($1, $2, $3)`,
                [`${result.rows[0].title}_${counter++}`,
                    picture.url,
                    result.rows[0].id
                ])

        }
        console.log(result.rows[0])
        // 5 - We return the new datas
        const theStep = await this.getOneStep(result.rows[0].id);
        return theStep

    },

    async getStepByTripId(tripId) {
        const result = await client.query('SELECT * FROM step_photo WHERE trip_id = $1', [tripId]);
        return result.rows;
    },

    async deleteOneStep(stepId) {
        console.log(stepId, 'deleteOneStep')
        const verify = await client.query(`SELECT * FROM photo WHERE step_id = $1`, [stepId]);
        console.log(verify.rowCount, '-------------');
        if (verify.rowCount != 0) {
            await client.query(`DELETE FROM photo WHERE step_id = $1`, [stepId]);

        }
        console.log('stepId', stepId)
        await client.query(`DELETE FROM step WHERE id = $1`, [stepId]);
        console.log('pouet')
        const messages = `Suppression de l'étape terminée`;
        return messages;
    }


};

module.exports = stepDataMapper;