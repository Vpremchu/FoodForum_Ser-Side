const Recipe = require('../models/recipe.model');
//const User = require('../models/user.model');

module.exports = {
    getAllRecipes(req, res, next) {
        Recipe.find({})
            .then(recipe => res.send(recipe))
            .catch(next);
    },

    getRecipeById(req, res, next) {
        const recipeId = req.params.id;

        Recipe.findById(recipeId)
            .then(recipe => res.send(recipe))
            .catch(next);
    },

    createRecipe(req, res, next) {
        const recipeProps = req.body;

        Recipe.create(recipeProps)
            .then(recipe => res.send(recipe))
            .catch(next);
    },

    updateRecipe(req, res, next) {
        const recipeId = req.params.id;
        const recipeProps = req.body;

        Recipe.findOneAndUpdate({_id: recipeId}, recipeProps)
            .then((recipe) => res.send(recipe))
            .catch(next);
    },

    deleteRecipeById(req, res, next) {
        const recipeId = req.params.id;

        Recipe.findByIdAndRemove(recipeId)
            .then(() => {
                Comment.find({ recipeId: recipeId }).remove().exec()
                    .then(res.status(200).send())
                    .catch(next);
            })
            .catch(next);
    }
};