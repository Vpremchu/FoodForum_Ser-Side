const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.set('secretKey', 'nodeRestApi'); // jwt secret token

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV !== 'testENV') {
    mongoose.connect('mongodb+srv://Virawan:!Secret123!@mongodb-zw8u8.azure.mongodb.net/test?retryWrites=true',
        { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log("Succesfully connected");
        })
        .on('error', (error) => {
            console.warn('Error', error);
        })
} else {
    mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {
            console.log("Connected to test mongo db");
        })
        .on('error', err => {
            console.warn('Warning', err);
        });
}

app.use(bodyParser.json());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;