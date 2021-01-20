const client = require('./client');

const tripDataMapper = {
    async getAllTrips() {
        const result = await client.query("SELECT * FROM trip");
        console.log('doudou', result.rows);
        return result.rows;
    },

    async getTripById(idTrip) {
        const result = await client.query("SELECT * FROM 'trip' JOIN 'step' ON 'step'.'trip_id' = 'trip'.'id' WHERE 'trip'.'id' = $1", [idTrip]);

        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async createTrip() {
        const result = await client.query("INSERT INTO trip() VALUES RETURNING *", []);
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

    async deleteOneTrip() {
        const result = await client.query("");
    }


};

module.exports = tripDataMapper;