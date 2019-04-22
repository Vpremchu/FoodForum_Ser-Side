const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema ({
    Name: {
        type: String,
        required: [true, 'An ingredient needs a name']
    },
    Description: String,
    Amount: {
        type: String,
        required: [true, 'An ingredient needs to be given an amout']
    }
});

//Ingredient = mongoose.model('ingredient', IngredientSchema);

module.exports = IngredientSchema;