const HTTPStatus = require('http-status');
const {addQuery, camel} = require('../helpers');
const config = require('../../config');
const Instagram = require('../../instagram');
const jwt = require('jsonwebtoken');

const register = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE email=$(email)', body);
    ctx.assert(!user, HTTPStatus.BAD_REQUEST, 'User already exist');
    const customer = await ctx.stripe.customers.create({email: body.email});
    const payload = Object.assign({}, body, {stripeId: customer.id});
    const {keys, values} = addQuery(payload);
    const {id} = await ctx.db.one(`INSERT INTO customer(${keys}) VALUES(${values}) RETURNING id`, payload).catch;
    return ctx.body = {token: jwt.sign({id, stripe: customer.id}, config.jwt.secret)};
};

const login = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE email=$(email)', body);
    ctx.assert(user, HTTPStatus.BAD_REQUEST, 'User dont exist');
    ctx.assert(user.password === body.password, HTTPStatus.BAD_REQUEST, 'Wrong password');
    return ctx.body = {token: jwt.sign({id: user.id, stripe: user.stripeId}, config.jwt.secret)};
};

const loginInstagram = async (ctx) => {
    const body = ctx.request.body;
    const result = await Instagram({}).login(body.code);
    const instagram = result.body;
    const token = instagram.access_token;
    const {id} = instagram.user;
    const existingUser = await ctx.db.oneOrNone('SELECT * FROM customer WHERE instagram_id=$(id)', {id}).then(camel);

    if(existingUser){
        return ctx.body = {token: jwt.sign({id: existingUser.id, stripe: existingUser.stripeId, instagram: token}, config.jwt.secret)};
    }

    const customer = await ctx.stripe.customers.create({email: `${id}@getmona.co`});
    const payload = {stripeId: customer.id, instagramId: id};
    const {keys, values} = addQuery(payload);
    const user = await ctx.db.one(`INSERT INTO customer(${keys}) VALUES(${values}) RETURNING id`, payload);
    return ctx.body = {token: jwt.sign({id: user.id, stripe: customer.id, instagram: token}, config.jwt.secret)};
};

module.exports = {register, login, loginInstagram};