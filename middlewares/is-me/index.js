const HTTPStatus = require('http-status');
const config = require('../../config');
const jwt = require('jsonwebtoken');

/**
 * Middleware for checking if user can update/del/get a resource
 * @param ctx
 * @param next
 */
const isMe = async (ctx, next) => {
    const {user, admin} = ctx.state;
    const id = ctx.params.id;
    const isAuthorized = user == id || admin;

    return !isAuthorized
        ? ctx.throw('Should be admin or owner to access this route', HTTPStatus.UNAUTHORIZED)
        : next();
};

module.exports = isMe;