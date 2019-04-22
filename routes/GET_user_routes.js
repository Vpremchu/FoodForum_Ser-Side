const UserController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.get('/:id', UserController.getUserById);
router.get('/email/:email', UserController.getUserByEmail);
router.get('', UserController.getAllUsers);

module.exports = router;