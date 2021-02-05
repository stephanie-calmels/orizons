const client = require('./client');

const countryDataMapper = {
    async getAllCountry() {
        const result = client.query(`SELECT * FROM "country" ORDER BY "id"`)
        return result
    }
};

module.exports = countryDataMapper;