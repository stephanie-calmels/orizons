const express = require('express');

const authorizationMW = require('../middleware/auth')
const tripController = require('../controllers/tripController');

const router = express.Router();



router.get('/', tripController.getAllTrip);
router.get('/:tripId', tripController.getOneTrip);
router.post('/', authorizationMW, tripController.createTrip);
router.patch('/', tripController.updateAllTrip);
router.patch('/:tripId', tripController.updateOneTrip);
router.delete('/', tripController.deleteAllTrip);
router.delete('/:tripId', tripController.deleteOneTrip);

module.exports = router;