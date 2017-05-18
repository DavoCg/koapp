const {getAddQuery} = require('../helpers');

/**
 * Add an address for the given user
 * @param ctx
 * @returns {*}
 */
const add = async (ctx) => {
    const body = ctx.request.body;
    const userid = ctx.state.user;
    const payload = Object.assign({quantity: 1}, body, {userid});
    const {keys, values} = getAddQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO cart_post(${keys}) VALUES(${values}) RETURNING id`, payload);
};

/**
 * Get an address based on id
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    const userId = ctx.state.user;
    return ctx.body = await ctx.db.any('SELECT * FROM cart_post WHERE userid=$(userId)', {userId});
};

/**
 * Remove an user by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM cart_post WHERE id=$(id) RETURNING id', {id});
};

module.exports = {add, list, remove};