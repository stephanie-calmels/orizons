const jwt = require('express-jwt');

const authorizationMW = jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256']
});
module.exports = authorizationMW;