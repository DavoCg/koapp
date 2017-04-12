const HTTPStatus = require('http-status');
const config = require('../../config');
const jwt = require('jsonwebtoken');

/**
 * Middleware for checking if user is admin
 * @param ctx
 * @param next
 */
const isAdmin = async (ctx, next) => {
    return !ctx.state.admin
        ? ctx.throw('Should be admin to access this routes', HTTPStatus.UNAUTHORIZED)
        : next();
};

module.exports = isAdmin;