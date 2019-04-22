const CUD_recipe_routes = require('./CUD_recipe_routes');
const GET_recipe_routes = require('./GET_recipe_routes');
const CREATE_user_routes = require('./CREATE_user_routes');
const UD_user_routes = require('./UD_user_routes');
const GET_user_routes = require('./GET_user_routes');
const commentRoutes = require('./comment_routes');
var jwt = require('jsonwebtoken');

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
        if (err) {
            res.status(401);
            res.json({ status: "error", message: err.message, data: null });            
        } else {
            // add user id to request
            req.body.userId = decoded.id;
            req.body.expiresIn = decoded.exp;
            next();
        }
    });
}

module.exports = (app) => {
    app.use('/api/recipe', GET_recipe_routes);
    app.use('/api/user', CREATE_user_routes);
    app.use('/api/user', GET_user_routes);
    app.use('/api/comment', commentRoutes);
    app.use('/api/recipe', validateUser, CUD_recipe_routes);
    app.use('/api/user', validateUser, UD_user_routes);
}