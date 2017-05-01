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
    if(!auth) return ctx.throw('No token provided', HTTPStatus.UNAUTHORIZED);
    
    try {
        const decoded = jwt.verify(auth, config.jwt.secret);
        ctx.state.user = decoded.id;
        ctx.state.stripe = decoded.stripe;
        ctx.state.instagram = '1296390747.ef34e21.5d89f308e053429c95f24ecd4e05663f';
        ctx.state.admin = config.admins.includes(decoded.id);
        return next();
    }
    catch(err) {
        return ctx.throw('token signature not valid', HTTPStatus.UNAUTHORIZED);
    }
};

module.exports = isLogged;