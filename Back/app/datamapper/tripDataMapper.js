const client = require('./client');

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

    async deleteOneTrip() {
        const result = await client.query("");
    }


};

module.exports = tripDataMapper;