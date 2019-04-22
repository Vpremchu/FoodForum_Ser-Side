const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Recipe = mongoose.model('recipe');
const User = mongoose.model('user');
const Comment = mongoose.model('comment');

let user;
let recipe;
let comment;
let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTE4ZWVmMzExOWQ3MzIwNDJlNTE0MyIsImlhdCI6MTU0NDY1NDY5MSwiZXhwIjoxNTQ0NjcyNjkxfQ.JtfPxeNBPKRaopEqaCi_2cSBb8f1mZIBpJDybLliGJo";

beforeEach((done) => {
    user = new User({ name: 'test', password: 'testPW!', email: 'test3@test.nl'})
    user.save()
        .then(() => {
            recipe = new Recipe({ Name: 'testRecipe', User: user._id, Preperation: 'test', Description: 'test', Category: 'test'})
            recipe.save()
                .then(() => {
                    comment = new Comment({ User: user._id, RecipeId: recipe._id, Content: 'testContent'})
                    comment.save()
                        .then(() => done());
                })
        })
})

describe('Recipe controller', () => {
    it('Post to /api/recipe creates a new recipe', (done) => {
        Recipe.countDocuments().then(count => {
            request(app)
                .post('/api/recipe')
                .set('X-Access-Token', authToken)
                .send({ Name: 'testRecipe', User: user._id, Preperation: 'test', Description: 'test', Category: 'test'})
                .end(() => {
                    Recipe.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);                        
                    })
                    done();
                });
        });
    });

    it('put to /api/recipe/:id edits a existing recipe', (done) => {
        const recipe2 = new Recipe({ Name: "recipe", User: user._id, Preperation: 'test', Description: 'test', Category: 'test'});
        recipe2.save().then(() => {
            request(app)
                .put(`/api/recipe/${recipe2._id}`)
                .set('X-Access-Token', authToken)
                .send({ Name: 'test recipe' })
                .end(() => {
                    Recipe.findOne({ User: user._id })
                        .then(recipeTest => {
                            assert(recipeTest.name === 'test recipe');                            
                        });
                        done();
                });
        });
    });
    it('Delete to /api/recipe/:id to delete a recipe', (done) => {
        const recipe2 = new Recipe({ Name: "recipe", User: user._id, Preperation: 'test', Description: 'test', Category: 'test'});
        recipe2.save().then(() => {
            request(app)
                .delete(`/api/recipe/${recipe2._id}`)
                .set('X-Access-Token', authToken)
                .send()
                .end(() => {
                    Recipe.findOne({ _id: recipe2._id })
                        .then(recipeTest => {
                            assert(recipeTest === null);
                        });
                        done();
                });
        });
    });

    it('Get to /api/recipe/id gets a recipe', (done) => {
        request(app)
            .get('/api/recipe/' + recipe._id)
            .set('X-Access-Token', authToken)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    });
})

