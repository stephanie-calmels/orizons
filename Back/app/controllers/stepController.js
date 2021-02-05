const stepDataMapper = require('../datamapper/stepDataMapper');
const tripStepDataMapper = require('../datamapper/tripStepDataMapper')

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
            const stepTripId = await stepDataMapper.createStep(newStep);
            // je récupère l'id de l'étape et l'id de l'user ou l'id du trip
            //  dans request.file j'insère en bouclant sur le file dans la table photo
            const trip = await tripStepDataMapper.getTripById(stepTripId);
            const steps = await stepDataMapper.getStepByTripId(stepTripId);
            response.json({
                data: [{
                        trip,
                        steps
                    },

                ]
            })
        } catch (error) {
            next(error)
        }
    },

    async uptdateOneStep(request, response, next) {
        try {
            const {
                stepId
            } = request.params;
            const stepInfos = request.body;


            const step = await stepDataMapper.updateOneStep(stepId, stepInfos);
            const trip = await tripStepDataMapper.getTripById(step);


            const steps = await stepDataMapper.getStepByTripId(step);




            response.json({
                data: [{
                        trip,
                        steps
                    },

                ]
            })
        } catch (error) {
            next(error)
        }
    },

    async deleteOneStep(request, response, next) {
        try {
            const {
                stepId
            } = request.params
            console.log(request.params)

            console.log(request.body)
            await stepDataMapper.deleteOneStep(stepId)
            console.log(trip_id)
            const trip = await tripStepDataMapper.getTripById(trip_id);
            const steps = await stepDataMapper.getStepByTripId(trip_id);
            response.json({
                data: [{
                        trip,
                        steps
                    },

                ]
            });
        } catch (error) {
            next(error)
        }
    }
};

module.exports = stepController;