const RecipeController = require('../controllers/recipe_controller');
const express = require('express');
const router = express.Router();
   
router.post('', RecipeController.createRecipe);
router.put('/:id', RecipeController.updateRecipe);
router.delete('/:id', RecipeController.deleteRecipeById);

module.exports = router;