const memberDataMapper = require('../datamapper/memberDataMapper');
const tripDataMapper = require('../datamapper/tripDataMapper');
const stepDataMapper = require('../datamapper/stepDataMapper');
const tripController = {
    async getAllTrip(request, response, next) {
        try {
            const trips = await tripDataMapper.getAllTrips();
            response.json({
                data: trips
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
            const trip = await tripDataMapper.getTripById(tripId);
            console.log(trip.member_id)
            // 2 - Les informations du member
            //const author = await memberDataMapper.getMemberById(trip.member_id)
            const steps = await stepDataMapper.getStepByTripId(tripId)

            response.json({
                data: [{
                    trip,
                    author: steps
                }]
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
        try {
            const trips = await tripDataMapper.updateAllTrip();
            response.json({
                data: trips
            })
        } catch (error) {
            next(error)
        }
    },
    async updateOneTrip(request, response, next) {
        try {
            const {
                tripId
            } = request.params
            const trip = await tripDataMapper.updateOneTrip(tripId);
            response.json({
                data: trip
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