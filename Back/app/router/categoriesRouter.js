const {
    Router
} = require("express");
const router = require(".");

const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoriesController.getAllCategory);
router.get('/:id', categoriesController.getOneCategory);
router.post('/', categoriesController.createCategory);
router.patch('/', categoriesController.updateAllCategory);
router.patch('/:id', categoriesController.updateOneCategory);
router.delete('/', categoriesController.deleteAllCategory);
router.delete('/:id', categoriesController.deleteOneCategory);

module.exports = router;