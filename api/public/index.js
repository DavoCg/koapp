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
    const {keys, values} = getAddQuery(body);
    const user = await ctx.db.oneOrNone('SELECT * FROM dog WHERE email=$(email)', body);
    ctx.assert(!user, HTTPStatus.BAD_REQUEST, 'User already exist');
    const {id} = await ctx.db.one(`INSERT INTO dog(${keys}) VALUES(${values}) RETURNING id`, body);
    return ctx.body = {token: jwt.sign({id}, config.jwt.secret)};
};

/**
 * Log an user
 * @param ctx
 * @returns {{youpi: boolean}}
 */
const login = async (ctx) => {
    const body = ctx.request.body;
    const user = await ctx.db.oneOrNone('SELECT * FROM dog WHERE email=$(email)', body);
    ctx.assert(user, HTTPStatus.BAD_REQUEST, 'User not found');
    return ctx.body = {youpi: true};
};

module.exports = {register, login};