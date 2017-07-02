const {addQuery, camel} = require('../helpers');
const queries = require('./queries');

const list = async (ctx) => {
    const {limit, page} = ctx.query;
    const userId = ctx.state.user;
    const q = queries.list(limit, page);
    return ctx.body = await ctx.db.any(q, {userId}).then(camel);
};

const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const payload = Object.assign({}, body, {userId});
    const {keys, values} = addQuery(payload);
    const q = queries.add(keys, values);
    return ctx.body = await ctx.db.one(q, payload);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

const isFavorite = async (ctx) => {
    const {postId} = ctx.params;
    const userId = ctx.state.user;
    const q = queries.isFavorite();
    const favorite = await ctx.db.oneOrNone(q, {userId, postId});
    return ctx.body = {favorite: !!favorite};
};

module.exports = {list, add, remove, isFavorite};