const UserController = require('../controllers/user_controller');
const express = require('express');
const router = express.Router();

router.put('/:email', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/:id', UserController.addRecipeToUser);

module.exports = router;