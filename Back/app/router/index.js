const express = require('express');

const jwt = require('../middleware/auth');

const tripRouter = require('./tripRouter');
const categoryRouter = require('./categoryRouter');
const memberRouter = require('./memberRouter');
const stepRouter = require('./stepRouter');

const errorController = require('../controllers/errorController');

const router = express.Router();

router.use('/trips', tripRouter);
router.use('/categories', categoryRouter);
router.use('/members', memberRouter);
router.use('/steps', jwt, stepRouter)

//router.use(errorController.error404);

//router.use(errorController.error500);

module.exports = router;