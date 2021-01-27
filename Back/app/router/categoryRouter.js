const express = require('express');

const jwt = require('../middleware/auth')

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/:categoriesId', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);
router.patch('/', categoryController.updateAllCategory);
router.patch('/:categoriesId', categoryController.updateOneCategory);
router.delete('/', jwt, categoryController.deleteAllCategory);
router.delete('/:categoriesId', jwt, categoryController.deleteOneCategory);


module.exports = router;