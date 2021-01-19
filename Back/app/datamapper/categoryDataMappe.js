const {
    getAllCategory
} = require('../controller/categoryController');
const client = require('./client');

const categoryDataMapper = {
    async getAllCategory() {
        const result = await client.query("SELECT * FROM category");
        return result.rows;
    },

    async getCategoryById(categoryId) {
        const result = await client.query("SELECT * FROM category WHERE id = $1", [categoryId])
        if (result.rowCount == 0) {
            return null;
        }
        return result.rows[0];
    },

    async createCategory() {
        const result = await client.query("INSERT INTO category() VALUES RETURNING *", []);
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