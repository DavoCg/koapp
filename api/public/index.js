const HTTPStatus = require('http-status');
const {getAddQuery} = require('../helpers');
const config = require('../../config');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * @param ctx
 * @returns {*}
 */
const register = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM dog WHERE email=$(email)', body);
    ctx.assert(!user, HTTPStatus.BAD_REQUEST, 'User already exist');
    const customer = await ctx.stripe.customers.create({email: body.email});
    const payload = Object.assign({}, body, {stripeid: customer.id});
    const {keys, values} = getAddQuery(payload);
    const {id} = await ctx.db.one(`INSERT INTO dog(${keys}) VALUES(${values}) RETURNING id`, payload);
    return ctx.body = {token: jwt.sign({id, stripe: customer.id}, config.jwt.secret)};
};

/**
 * Log an user
 * @param ctx
 * @returns {{token: *}}
 */
const login = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM dog WHERE email=$(email)', body);
    ctx.assert(user, HTTPStatus.BAD_REQUEST, 'User dont exist');
    ctx.assert(user.password === body.password, HTTPStatus.BAD_REQUEST, 'Wrong password');
    return ctx.body = {token: jwt.sign({id: user.id, stripe: user.stripeid}, config.jwt.secret)};
};

module.exports = {register, login};