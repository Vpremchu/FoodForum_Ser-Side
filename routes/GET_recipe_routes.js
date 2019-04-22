const RecipeController = require('../controllers/recipe_controller');
const express = require('express');
const router = express.Router();

router.get('', RecipeController.getAllRecipes);
router.get('/:id', RecipeController.getRecipeById);

module.exports = router;