const {addQuery, camel} = require('../helpers');
const queries = require('./queries');

const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const payload = Object.assign({quantity: 1}, body, {userId});
    const {keys, values} = addQuery(payload);
    const q = queries.add(keys, values);
    return ctx.body = await ctx.db.one(q, payload);
};

const list = async (ctx) => {
    const userId = ctx.state.user;
    const q = queries.list();
    return ctx.body = await ctx.db.any(q, {userId}).then(camel);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

module.exports = {add, list, remove};