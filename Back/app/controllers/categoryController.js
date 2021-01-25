const categoryDataMapper = require('../datamapper/categoryDataMapper');
const categoriesController = {
    async getAllCategory(request, response, next) {
        try {
            const categories = await categoryDataMapper.getAllCategory();
            response.json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    },
    async getOneCategory(request, response, next) {
        try {
            const {
                categoryId
            } = request.params;
            const category = await categoryDataMapper.getCategoryById(categoryId);
            response.json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
    async createCategory(request, response, next) {
        try {
            const newCategory = request.body;
            const category = await categoryDataMapper.createCategory(newCategory);
            response.json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
    async updateAllCategory(request, response, next) {
        try {
            const categories = await categoryDataMapper.updateAllCategories();
            response.json({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    },
    async updateOneCategory(request, response, next) {
        try {
            const {
                categoryId
            } = request.params;
            const category = await categoryDataMapper.updateOneCategory(categoryId);
            response.json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteAllCategory(request, response, next) {
        try {
            const categories = await categoryDataMapper.deleteAllCategories();
            response.json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteOneCategory(request, response, next) {
        try {
            const {
                categoryId
            } = request.params
            const trip = await categoryDataMapper.deleteOneCategory(categoryId);
            response.json({
                data: category
            })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = categoriesController;