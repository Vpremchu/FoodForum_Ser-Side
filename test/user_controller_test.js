const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const User = mongoose.model('user');

describe('User controller', () => {
    it('Post to /api/user creates a new user', (done) => {
        request(app)
            .post('/api/user')
            .send({ name: 'TestUser', email: 'test@test.nl', password: '!Secret123!' })
            .expect(function(res) {
                assert(res.body.should.have.property("status", "success"));
            })
            .end(() => {
                done();
            });
    }).timeout(5000);

    it('Get to /api/user gets existing user', (done) => {
        const user = new User({ name: 'John', email: "test@test.nl", password: 'Secret123!' });
        user.save().then(() => {
            request(app)
                .post('/api/user/authenticate')
                .send({ email: 'test@test.nl', password: 'Secret123!' })
                .expect(function(res) {
                    assert(res.body.should.have.property("status", "success"));
                })
                .end(() => {
                    done();
                });
        });
    });
});
