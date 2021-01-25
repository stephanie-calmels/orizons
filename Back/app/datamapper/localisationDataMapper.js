const client = require('./client');

const localisationDataMapper = {
    async getLocalisationByTrip(tripId) {
        const result = await client.query(`SELECT "country" FROM "localisation" JOIN "_m2m_trip_localisation" tl ON tl.trip_id = localisation.id WHERE tl.tip_id = $1`, [tripId]);
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    }
};

module.exports = localisationDataMapper;