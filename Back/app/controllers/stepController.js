const stepDataMapper = require('../datamapper/stepDataMapper');
const stepController = {
    async getAllStep(request, response, next) {
        try {
            const steps = await stepDataMapper.getAllStep();
            response.json({
                data: steps
            });
        } catch (error) {
            next(error)
        }
    },
    async createStep(request, response, next) {
        try {
            const newStep = request.body;
            const step = await stepDataMapper.createStep(newStep);
            response.json({
                data: step
            })
        } catch (error) {
            next(error)
        }
    }
};

module.exports = stepController;