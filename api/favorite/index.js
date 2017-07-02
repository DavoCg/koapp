const {addQuery, camel} = require('../helpers');

const list = async (ctx) => {
    const {limit, page} = ctx.query;
    const userId = ctx.state.user;
    const q = `SELECT favorite.id, favorite.post_id, username, quantity, price, picture FROM post JOIN customer ON post.user_id = customer.id JOIN favorite ON favorite.post_id = post.id WHERE favorite.user_id=$(userId) LIMIT ${limit} OFFSET ${(page - 1) * limit}`;
    return ctx.body = await ctx.db.any(q, {userId}).then(camel);
};

const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const payload = Object.assign({}, body, {userId});
    const {keys, values} = addQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO favorite(${keys}) VALUES(${values}) RETURNING id`, payload);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM favorite WHERE id=$(id) RETURNING id', {id});
};

const isFavorite = async (ctx) => {
    const {postId} = ctx.params;
    const userId = ctx.state.user;
    const favorite = await ctx.db.oneOrNone('SELECT id from favorite WHERE user_id=${userId} AND post_id=$(postId)', {userId, postId});
    return ctx.body = {favorite: !!favorite};
};

module.exports = {list, add, remove, isFavorite};