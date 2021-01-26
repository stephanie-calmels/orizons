//const memberDataMapper = require('../datamapper/memberDataMapper');
const tripDataMapper = require('../datamapper/tripDataMapper');
const stepDataMapper = require('../datamapper/stepDataMapper');
const localisationDataMapper = require('../datamapper/localisationDataMapper');
const categoryDataMapper = require('../datamapper/categoryDataMapper');
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
            const steps = await stepDataMapper.getStepByTripId(tripId);

            // 3 - Les informations de localisation du voyage
            const localisation = await localisationDataMapper.getLocalisationByTrip(tripId);

            // 4 - Les informations de catégories
            const categories = await categoryDataMapper.getCategoryByTripId(tripId);

            // 5 - Les photos enregistrées pour chaque étape
            const photos = await photoDataMapper.getPhotosByTripByStep(tripId)
            // 6 - author -- nickname et le line vers la photo de profil

            response.json({
                data: [{
                        trip,
                        localisation,
                        author,
                        steps
                    },

                ]
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