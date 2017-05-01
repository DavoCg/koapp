const HTTPStatus = require('http-status');
const {getAddQuery} = require('../helpers');
const config = require('../../config');
const Instagram = require('../../instagram');
const jwt = require('jsonwebtoken');

/**
 * Register a new user
 * @param ctx
 * @returns {*}
 */
const register = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE email=$(email)', body);
    ctx.assert(!user, HTTPStatus.BAD_REQUEST, 'User already exist');
    const customer = await ctx.stripe.customers.create({email: body.email});
    const payload = Object.assign({}, body, {stripeid: customer.id});
    const {keys, values} = getAddQuery(payload);



    const {id} = await ctx.db.one(`INSERT INTO customer(${keys}) VALUES(${values}) RETURNING id`, payload);
    await ctx.db.none(`INSERT INTO cart(userid) VALUES($(userid))`, {userid: id});



    return ctx.body = {token: jwt.sign({id, stripe: customer.id}, config.jwt.secret)};
};

/**
 * Log an user
 * @param ctx
 * @returns {{token: *}}
 */
const login = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE email=$(email)', body);
    ctx.assert(user, HTTPStatus.BAD_REQUEST, 'User dont exist');
    ctx.assert(user.password === body.password, HTTPStatus.BAD_REQUEST, 'Wrong password');
    return ctx.body = {token: jwt.sign({id: user.id, stripe: user.stripeid}, config.jwt.secret)};
};


const test = async (ctx) => {
    const insta = Instagram({});
    const user = await insta.mediasSelf();
    return ctx.body = user.body;
};

module.exports = {register, login, test};