const express = require('express');

const jwt = require('../middleware/auth');

const tripRouter = require('./tripRouter');
const categoriesRouter = require('./categoriesRouter');
const memberRouter = require('./memberRouter');
const stepRouter = require('./stepRouter');

const errorController = require('../controllers/errorController');

const router = express.Router();

router.use('/trips', tripRouter);
router.use('/categories', categoriesRouter);
router.use('/members', jwt, memberRouter);
router.use('/steps', jwt, stepRouter)

//router.use(errorController.error404);

//router.use(errorController.error500);

module.exports = router;