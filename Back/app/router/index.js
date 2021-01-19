const express = require('express');

const mainRouter = require('./mainRouter');

const errorController = require('../controller/errorController');

const router = express.Router();

router.use('/home', mainRouter);

router.use(errorController.error404);

router.use(errorController.error500);

module.exports = router;