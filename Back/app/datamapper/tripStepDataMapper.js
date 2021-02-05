const client = require('./client');

const tripStepDataMapper = {
    async getTripById(idTrip) {
        //1 - les informations du voyage
        const result = await client.query("SELECT * FROM trip_with_duration_status WHERE id=($1)", [idTrip]);
        //2 - les informations de l'auteur



        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];

    }
};

module.exports = tripStepDataMapper;