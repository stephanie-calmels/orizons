const express = require('express');

const memberController = require('../controllers/memberController');

const router = express.Router();

router.get('/', memberController.getAllMember);
router.get('/:id', memberController.getOneMember);
router.post('/', memberController.createMember);
router.patch('/', memberController.updateAllMember);
router.patch('/:id', memberController.updateOneMember);
router.delete('/', memberController.deleteAllMember);
router.delete('/:id', memberController.deleteOneMember);

module.exports = router;