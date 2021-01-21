const express = require('express');

const memberController = require('../controllers/memberController');

const router = express.Router();

router.get('/', memberController.getAllMember);
router.get('/:memberId', memberController.getOneMember);
router.post('/', memberController.createMember);
router.patch('/', memberController.updateAllMember);
router.patch('/:memberId', memberController.updateOneMember);
router.delete('/', memberController.deleteAllMember);
router.delete('/:memberId', memberController.deleteOneMember);

module.exports = router;