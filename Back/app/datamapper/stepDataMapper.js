const client = require('./client');

const stepDataMapper = {
    async getAllStep() {
        const result = await client.query("SELECT * FROM step");
        return result.rows;
    },

    async createStep(newStep) {
        const result = await client.query('INSERT INTO step(longitude, latitude, title, number_step, content, member_id, localisation_id, trip_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [
                newStep.longitude,
                newStep.latitude,
                newStep.title,
                newStep.number_step,
                newStep.content,
                newStep.member_id,
                newStep.localisation_id,
                newStep.trip_id
            ]);
        return result.rows[0]

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
        await client.query(`DELETE FROM step WHERE id = $1`, [stepId]);
        const message = `Suppression de l'étape terminée`;
        return message;
    }


};

module.exports = stepDataMapper;