const express = require('express');

const tripRouter = require('./tripRouter');
const categoriesRouter = require('./categoriesRouter');
const memberRouter = require('./memberRouter')

const errorController = require('../controllers/errorController');

const router = express.Router();

router.use('/trips', tripRouter);
router.use('/categories', categoriesRouter);
router.use('/members', memberRouter);

//router.use(errorController.error404);

//router.use(errorController.error500);

module.exports = router;