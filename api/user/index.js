const {getUpdateQuery} = require('../helpers');


const me = async (ctx) => {
    return ctx.body = {user: ctx.state.user}
};

/**
 * List all users
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    return ctx.body = await ctx.db.any('SELECT * FROM customer');
};

/**
 * Get one user based on id
 * @param ctx
 * @returns {*}
 */
const get = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.oneOrNone('SELECT * FROM customer WHERE id=$(id)', {id});
};

/**
 * Update a user by id (update only fields in body)
 * @param ctx
 * @returns {*}
 */
const update = async (ctx) => {
    const {id} = ctx.params;
    const body = ctx.request.body;
    const values = getUpdateQuery(body);
    return ctx.body = await ctx.db.one(`UPDATE customer SET ${values} WHERE id=$(id) RETURNING id`, Object.assign({id}, body));
};

/**
 * Remove a user by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM customer WHERE id=$(id) RETURNING id', {id});
};

module.exports = {list, get, update, remove, me};