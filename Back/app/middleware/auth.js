const jwt = require('express-jwt');

const authorizationMiddleware = jwt({
    secret: jwtSecret,
    algorithms: ['HS256']
});

module.exports = authorizationMiddleware;