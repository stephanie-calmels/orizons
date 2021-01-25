const express = require('express');

const jwt = require('../middleware/auth');

const tripController = require('../controllers/tripController');

const router = express.Router();



router.get('/', tripController.getAllTrip);
router.get('/:tripId', tripController.getOneTrip);
router.post('/', jwt, tripController.createTrip)
//router.post('/', authorizationMW, tripController.createTrip);
//router.patch('/', jwt, tripController.updateAllTrip);
//router.patch('/:tripId', jwt, tripController.updateOneTrip);
//router.delete('/', jwt, tripController.deleteAllTrip);
//router.delete('/:tripId',jwt,  tripController.deleteOneTrip);

module.exports = router;