const {getAddQuery, getUpdateQuery} = require('../helpers');

/**
 * Add an address for the given user
 * @param ctx
 * @returns {*}
 */
const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const payload = Object.assign({}, body, {userId});
    const {keys, values} = getAddQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO address(${keys}) VALUES(${values}) RETURNING id`, payload);
};

/**
 * List all addresses
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    return ctx.body = await ctx.db.any('SELECT * FROM address');
};

/**
 * Get an address based on id
 * @param ctx
 * @returns {*}
 */
const get = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.oneOrNone('SELECT * FROM address WHERE id=$(id)', {id});
};

/**
 * Update an address by id (update only fields in body)
 * @param ctx
 * @returns {*}
 */
const update = async (ctx) => {
    const {id} = ctx.params;
    const body = ctx.request.body;
    const values = getUpdateQuery(body);
    return ctx.body = await ctx.db.one(`UPDATE address SET ${values} WHERE id=$(id) RETURNING id`, Object.assign({id}, body));
};

/**
 * Remove an user by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM address WHERE id=$(id) RETURNING id', {id});
};

module.exports = {add, list, get, update, remove};