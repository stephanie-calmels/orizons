const tripDataMapper = require('../datamapper/tripDataMapper');
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
            const trip = await tripDataMapper.getTripById(tripId);
            response.json({
                data: trip
            })
        } catch (error) {
            next(error)
        }
    },
    async createTrip(request, response, next) {
        try {
            console.log('BONJOUR');
            //const trip = await tripDataMapper.createTrip();
            // response.json({
            //     data: trip
            // })
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