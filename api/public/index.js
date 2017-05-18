const HTTPStatus = require('http-status');
const {getAddQuery} = require('../helpers');
const config = require('../../config');
const Instagram = require('../../instagram');
const jwt = require('jsonwebtoken');

//todo transaction cart

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
    const {id} = await ctx.db.one(`INSERT INTO customer(${keys}) VALUES(${values}) RETURNING id`, payload).catch;
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

const loginInstagram = async (ctx) => {
    const body = ctx.request.body;
    const result = await Instagram({}).login(body.code);
    const instagram = result.body;
    const token = instagram.access_token;
    const {id} = instagram.user;
    const existingUser = await ctx.db.oneOrNone('SELECT * FROM customer WHERE instagramid=$(id)', {id});

    if(existingUser){
        return ctx.body = {token: jwt.sign({id: existingUser.id, stripe: existingUser.stripeid, instagram: token}, config.jwt.secret)};
    }

    const customer = await ctx.stripe.customers.create({email: `${id}@getmona.co`});
    const payload = {stripeid: customer.id, instagramid: id};
    const {keys, values} = getAddQuery(payload);
    const user = await ctx.db.one(`INSERT INTO customer(${keys}) VALUES(${values}) RETURNING id`, payload);
    await ctx.db.none(`INSERT INTO cart(userid) VALUES($(userid))`, {userid: user.id});
    return ctx.body = {token: jwt.sign({id: user.id, stripe: customer.id, instagram: token}, config.jwt.secret)};
};

module.exports = {register, login, loginInstagram};