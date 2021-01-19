const {
    createTrip,
    updateAllTrip,
    deleteAllTrip
} = require('../controller/tripController');
const client = require('./client');

const tripDataMapper = {
    async getAllTrips() {
        const result = await query("SELECT * FROM trip");
        return result.rows;
    },

    async getTripById(idTrip) {
        const result = await client.query("SELECT * FROM trip WHERE id = $1", [idTrip]);

        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async createTrip() {
        const result = await client.query("INSERT INTO trip() VALUES RETURNING *", []);
        return result.rows[0];
    };

    async updateAllTrip() {
        const result = await client.query("");
    },

    async updateTripById(idTrip) {
        const result = await client.query("");
    },

    async deleteAllTrip() {
        const result = await client.query("");
    },

    async deleteTripById() {
        const result = await client.query("");
    }


};

module.exports = tripDataMapper;