const CommentController = require('../controllers/comment_controller');
const express = require('express');
const router = express.Router();

router.post('/:id', CommentController.addCommentToRecipe);
router.put('/:id', CommentController.updateComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;