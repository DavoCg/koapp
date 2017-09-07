const HTTPStatus = require('http-status');
const config = require('../../config');
const jwt = require('jsonwebtoken');

/**
 * Middleware for checking whos the user
 * @param ctx
 * @param next
 */
const isLogged = async (ctx, next) => {
    const {authorization, Authorization} = ctx.headers;
    const auth = authorization || Authorization;
    if(!auth) return ctx.throw('No token provided bitch', HTTPStatus.UNAUTHORIZED);
    
    try {
        const decoded = jwt.verify(auth, config.jwt.secret);
        ctx.state.user = decoded.id;
        ctx.state.stripe = decoded.stripe;
        ctx.state.admin = config.admins.includes(decoded.id);
        return next();
    }
    catch(err) {
        return ctx.throw('token signature not valid', HTTPStatus.UNAUTHORIZED);
    }
};

module.exports = isLogged;