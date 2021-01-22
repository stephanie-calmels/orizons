const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/:categoriesId', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);
router.patch('/', categoryController.updateAllCategory);
router.patch('/:categoriesId', categoryController.updateOneCategory);
router.delete('/', categoryController.deleteAllCategory);
router.delete('/:categoriesId', categoryController.deleteOneCategory);


module.exports = router;