const client = require('./client');

const categoryDataMapper = {
    async getAllCategory() {
        const result = await client.query("SELECT * FROM category ORDER BY entitled");
        return result.rows;
    },

    async getCategoryById(categoryId) {
        const result = await client.query("SELECT * FROM category WHERE id = $1", [categoryId])
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async getCategoryByTripId(tripId) {
        const result = await client.query('SELECT * FROM category JOIN trip ON trip.category_id = category.id WHERE trip.id = $1', [tripId]);
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async createCategory(newCategory) {
        const result = await client.query("INSERT INTO category(entitled, color, image) VALUES ($1, $2, $3) RETURNING *", [
            newCategory.entitled,
            newCategory.color,
            newCategory.image
        ]);
        return result.rows[0];
    },

    async updateAllCategories() {
        const result = await client.query("");
    },

    async updateOneCategory(idTrip) {
        const result = await client.query("");
    },

    async updateAllCategories() {
        const result = await client.query("");
    },

    async deleteOneCategory() {
        const result = await client.query("");
    }

};

module.exports = categoryDataMapper;