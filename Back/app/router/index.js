const express = require('express');

const tripRouter = require('./tripRouter');
const categoriesRouter = require('./categoriesRouter');

const errorController = require('../controllers/errorController');

const router = express.Router();

router.use('/trips', tripRouter);
router.use('/categories', categoriesRouter);

//router.use(errorController.error404);

//router.use(errorController.error500);

module.exports = router;