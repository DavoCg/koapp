const {updateQuery, camel} = require('../helpers');
const queries = require('./queries');

const me = async (ctx) => {
    const {user: userId} = ctx.state;
    const q = queries.me();
    return ctx.body = await ctx.db.oneOrNone(q, {userId}).then(camel);
};

const list = async (ctx) => {
    const q = queries.list();
    return ctx.body = await ctx.db.any(q).then(camel);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.get();
    return ctx.body = await ctx.db.oneOrNone(q.get(), {id}).then(camel);
};

const update = async (ctx) => {
    const {id} = ctx.params;
    const body = ctx.request.body;
    const values = updateQuery(body);
    const q = queries.update(values);
    await ctx.db.one(q, Object.assign({id}, body));
    return ctx.body = await ctx.db.oneOrNone(queries.get(), {id}).then(camel);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

module.exports = {list, get, update, remove, me};