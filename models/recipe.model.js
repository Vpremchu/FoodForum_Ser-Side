const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = require('./ingredient.schema');

const RecipeSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'A recipe needs a name']
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'A recipe needs to be attached to a user']
    },
    Ingredients: [IngredientSchema],
    Category: {
        type: String,
        required: [true, 'A recipe needs a category']
    },
    Description: {
        type: String,
        required: [true, 'A recipe needs a description']
    },
    Preperation: {
        type: String,
        required: [true, 'A recipe needs a preperation']
    },
    Comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment',
        autopopulate: true
    }],
    ImageUrl: String
});

RecipeSchema.plugin(require('mongoose-autopopulate'));

Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;