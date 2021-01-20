const express = require('express');

const categoryController = require('../controllers/categoryController');

const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getOneCategory);
router.post('/', categoryController.createCategory);
router.patch('/', categoryController.updateAllCategory);
router.patch('/:id', categoryController.updateOneCategory);
router.delete('/', categoryController.deleteAllCategory);
router.delete('/:id', categoryController.deleteOneCategory);


module.exports = router;