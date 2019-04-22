const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'A user needs to be attached to a comment.']
    },
    RecipeId: {
        type: String,
        required: [true, 'A comment needs to be coupled to a Recipe']
    },
    Content: {
        type: String,
        required: [true, 'A comment needs content']
    }
});

Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;