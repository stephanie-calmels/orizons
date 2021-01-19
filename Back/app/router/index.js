const express = require('express');

const tripRouter = require('./tripRouter');
const categopryRouter = require('./categoriesRouter');

const errorController = require('../controller/errorController');

const router = express.Router();

router.use('/trip', tripRouter);
router.use('/categories', categoriesRouter);

router.use(errorController.error404);

router.use(errorController.error500);

module.exports = router;