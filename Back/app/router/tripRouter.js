const express = require('express');

const tripController = require('../controllers/tripController');

const router = express.Router();

router.get('/', tripController.getAllTrip);
router.get('/:id', tripController.getOneTrip);
router.post('/', tripController.createTrip);
router.patch('/', tripController.updateAllTrip);
router.patch('/:id', tripController.updateOneTrip);
router.delete('/', tripController.deleteAllTrip);
router.delete('/:id', tripController.deleteOneTrip);

module.exports = router;