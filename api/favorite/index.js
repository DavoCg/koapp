const {getAddQuery} = require('../helpers');

/**
 * List all favorites of a user
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    const user = ctx.state.user;
    const q = 'SELECT * FROM post JOIN favorite ON favorite.userid = post.userid WHERE favorite.userid=$(id)';
    return ctx.body = await ctx.db.any(q, {id: user});
};

/**
 * Add a favorite
 * @param ctx
 * @returns {*|XPromise<any>|external:Promise}
 */
const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const payload = Object.assign({}, body, {userid: userId});
    const {keys, values} = getAddQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO favorite(${keys}) VALUES(${values}) RETURNING id`, payload);
};

/**
 * Remove a favorite by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM favorite WHERE id=$(id) RETURNING id', {id});
};

module.exports = {list, add, remove};