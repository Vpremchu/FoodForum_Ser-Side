const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A user needs a name']        
    },
    email: {
        type: String,
        required: [true, 'A user needs an email'],
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'A user needs a password']
    }
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
