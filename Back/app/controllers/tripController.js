//const memberDataMapper = require('../datamapper/memberDataMapper');
const tripDataMapper = require('../datamapper/tripDataMapper');
const stepDataMapper = require('../datamapper/stepDataMapper');
const localisationDataMapper = require('../datamapper/localisationDataMapper');
const categoryDataMapper = require('../datamapper/categoryDataMapper');
const tripStepDataMapper = require('../datamapper/tripStepDataMapper');


const tripController = {
    async getAllTrip(request, response, next) {
        try {
            const trips = await tripDataMapper.getAllTrips();

            response.json({
                data: trips,
                //    categories
            })
        } catch (error) {
            next(error)
        }
    },
    async getOneTrip(request, response, next) {
        try {
            const {
                tripId
            } = request.params

            // 1 - les informations de 1 vopyage
            const trip = await tripStepDataMapper.getTripById(tripId);


            const steps = await stepDataMapper.getStepByTripId(tripId);

            // 3 - Les informations de localisation du voyage
            const localisation = await localisationDataMapper.getLocalisationByTrip(tripId);
            if (!trip) {
                response.locals.notFound = "trip";
                next();
                return
            }


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

    async getTripByMember(request, response, next) {
        try {
            const {
                memberId
            } = request.params
            const trip = await tripController.getTripByMember(memberId);
            response.json({
                date: trip
            })
        } catch (error) {
            next(error)
        }
    },

    async createTrip(request, response, next) {
        try {
            const newTrip = request.body;
            const trip = await tripDataMapper.createTrip(newTrip);

            response.json({
                data: trip
            })
        } catch (error) {
            next(error)
        }
    },
    async updateAllTrip(request, response, next) {

    },
    async updateOneTrip(request, response, next) {
        try {
            const {
                tripId
            } = request.params
            const tripInfos = request.body

            const updatedTrip = await tripDataMapper.updateOneTrip(tripId, tripInfos);
            const trip = await tripStepDataMapper.getTripById(updatedTrip);
            const steps = await stepDataMapper.getStepByTripId(updatedTrip);
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
    async deleteAllTrip(request, response, next) {
        try {
            const trips = await tripDataMapper.deleteAllTrip();
            response.json({
                data: trips
            })
        } catch (error) {
            next(error)
        }
    },
    async deleteOneTrip(request, response, next) {
        try {
            const {
                tripId
            } = request.params
            const trip = await tripDataMapper.deleteOneTrip(tripId);
            response.json({
                data: trip
            })
        } catch (error) {
            next(error)
        }
    },
};

module.exports = tripController;