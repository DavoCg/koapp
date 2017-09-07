const {updateQuery, addQuery, camel} = require('../helpers');
const queries = require('./queries');

const list = async (ctx) => {
    const {limit, page, userId} = ctx.query;
    const q = queries.list(userId, page, limit);
    return ctx.body = await ctx.db.any(q, {userId}).then(camel);
};

const listTrends = async (ctx) => {
    const q = queries.listTrends();
    return ctx.body = await ctx.db.any(q).then(camel);
};

const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;

    const payload = {
        userId: userId,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        picture: body.picture
    };

    const {keys, values} = addQuery(payload);
    const q = queries.add(keys, values);
    return ctx.body = await ctx.db.one(q, payload);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.get();
    return ctx.body = await ctx.db.oneOrNone(q, {id}).then(camel);

};

const update = async (ctx) => {
    const {id} = ctx.params;
    const body = ctx.request.body;
    const values = updateQuery(body);
    const q = queries.update(values);
    return ctx.body = await ctx.db.one(q, Object.assign({id}, body));
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

module.exports = {list, get, update, remove, add, listTrends};
