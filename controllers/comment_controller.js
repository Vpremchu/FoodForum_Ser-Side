const Comment = require('../models/comment.model');
const Recipe = require('../models/recipe.model');

module.exports = {
    addCommentToRecipe(req, res, next) {
        const recipeId = req.params.id;
        const commentProps = req.body;

        let comment;

        comment = new Comment(commentProps);
        comment.save()
            .then(() => {
                Recipe.findById({ _id: recipeId })
                    .then((recipe) => {
                        recipe.Comments.push(comment._id)
                        recipe.save()
                            .then(() => Recipe.findById({ _id: recipeId })
                                .then((recipe) => res.send(recipe))
                                .catch(next)
                            );
                    })
                    .catch(next);
            })
            .catch(next);


    },

    updateComment(req, res, next) {
        const commentId = req.params.id;
        const commentProps = req.body;

        Comment.findOneAndUpdate({ _id: commentId }, commentProps)
            .then((comment) => Recipe.findById({ _id: comment.RecipeId }))
            .then(recipe => res.send(recipe))
            .catch(next);

    },

    deleteComment(req, res, next) {
        const commentId = req.params.id;

        Comment.findOneAndRemove({ _id: commentId })
            .then(() => { res.status(200).send()})
                    .catch(next)

    }
};
