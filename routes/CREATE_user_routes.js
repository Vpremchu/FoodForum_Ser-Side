const UserController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.post('', UserController.createUser);
router.post('/authenticate', UserController.authenticate);

module.exports = router;