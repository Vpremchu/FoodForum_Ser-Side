const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser(req, res, next) {
        const userProps = req.body;       

        // add user to mongodb
        User.create(userProps)
            .then(user => {
                res.status(200).json(user);
            })
            .catch(err => {
                // error code 11000 in mongo signals duplicate entry
                if (err.code === 11000) {
                    res.status(409);
                    res.send('user already exists');
                } else {
                    next();
                }
            });
    },

    getAllUsers(req, res, next) {
        User.find({})
            .then(user => res.send(user))
            .catch(next);
    },

    getUserById(req, res, next) {
        const id = req.params.id;
        User.findById({ _id: id })
            .then(user => {
                res.send(user);
            })
            .catch(next);
    },

    getUserByEmail(req, res, next) {
        const email = req.params.email;
        User.find({email: email})
            .then(user => {
                res.send(user)
            })
            .catch(next);
    },

    updateUser(req, res, next) {
        const props = req.body;

        User.findOne({ email: props.email })
            .then((user) => {
                if (user.password === props.oldPassword) {
                    user.password = props.newPassword;
                    user.save()
                        .then(() => User.findOne({ email: props.email }))
                        .then(user => res.send(user))
                        .catch(next)
                } else {
                    res.status(412).send("Unable to update");
                }
            })
            .catch(next);
    },

    deleteUser(req, res, next) {
        const props = req.body;

        User.findOne({ _id: props.id })
            .then((user) => {                
                    User.findOneAndDelete({ _id: props.id })
                        .then(() => res.status(200).send())
                        .catch(next)                
            })
            .catch(next);
    },

    addRecipeToUser(req, res, next) {
        const userId = req.params.id;
        const recipeProps = req.body;

        User.findById({ _id: userId })
            .then(user => {
                user.Recipes.push(recipeProps._id)
                user.save()
                    .then(() => User.findById({ _id: userId }))
                    .then(user => res.send(user))
                    .catch(next)
            })
            .catch(next);
    },

    authenticate(req, res, next) {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '5h' });
                    res.json({ status: "Success", message: "User found", data: { user: user, token: token } });
                } else {
                    res.json({ status: "Error", message: "Invalid email and/or password", data: null });
                }
            }
        });
    }
}