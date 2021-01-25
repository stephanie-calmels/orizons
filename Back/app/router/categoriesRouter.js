const express = require('express');

const jwt = require('../middleware/auth')

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/:categoriesId', categoryController.getOneCategory);
router.post('/', jwt, categoryController.createCategory);
router.patch('/', jwt, categoryController.updateAllCategory);
router.patch('/:categoriesId', categoryController.updateOneCategory);
router.delete('/', jwt, categoryController.deleteAllCategory);
router.delete('/:categoriesId', jwt, categoryController.deleteOneCategory);


module.exports = router;