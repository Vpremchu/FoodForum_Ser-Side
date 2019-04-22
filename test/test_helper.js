const mongoose = require('mongoose');

beforeEach(done => {
    const { users, recipes, comments } = mongoose.connection.collections;

    users.drop(() => {
        recipes.drop(() => {
            comments.drop(() => {
                    done();
            })
        })
    })
})