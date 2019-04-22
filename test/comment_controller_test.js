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
    user = new User({ name: 'test', password: 'testPW!', email: 'test4@test.nl'})
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

describe('Comment controller', () => {
    it('Post to /api/comment/:id creates a new comment on a thread', (done) => {
        Comment.countDocuments().then(count => {
            request(app)
                .post(`/api/comment/ ${recipe._id}`)
                .set('X-Access-Token', authToken)
                .send({ User: user._id, RecipeId: recipe._id, Content: 'randomcomment'})
                .end(() => {
                    Comment.countDocuments().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    })
                });
        });
    });

    it('Delete to /api/comment/:id deletes a comment', (done) => {
        const comment = new Comment({ User: user._id, RecipeId: recipe._id, Content: 'testContent'});
        comment.save().then(() => {
            request(app)
                .delete(`/api/comment/${comment._id}`)
                .set('X-Access-Token', authToken)
                .send()
                .end(() => {
                    Comment.findById(comment._id)
                    .then(comment => {
                        assert(comment === null)
                        done();
                    });
                });
        });
    });
});