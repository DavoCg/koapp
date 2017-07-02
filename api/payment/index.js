const HTTPStatus = require('http-status');
const {addQuery, error, camel} = require('../helpers');
const queries = require('./queries');

const add = async (ctx) => {
    const {cardId} = ctx.request.body;
    const userId = ctx.state.user;
    const stripe = ctx.state.stripe;
    const source = await ctx.stripe.customers.createSource(stripe, {source: cardId});
    const payload = {stripeId: source.id, brand: source.brand, last4: source.last4, userId};
    const {keys, values} = addQuery(payload);
    const q = queries.add(keys, values);
    return ctx.body = await ctx.db.one(q, payload);
};

const list = async (ctx) => {
    const userId = ctx.state.user;
    const query = queries.list(ctx.state.admin);
    return ctx.body = await ctx.db.any(query, {userId}).then(camel);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.get();
    return ctx.body = await ctx.db.oneOrNone(q, {id}).then(camel);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const card = await ctx.db.oneOrNone(queries.get(), {id});
    const stripe = ctx.state.stripe;
    const cardId = card.stripeid;
    await ctx.stripe.customers.deleteCard(stripe, cardId).catch(error(HTTPStatus.BAD_REQUEST, 'Problem deleting card id:'));
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

module.exports = {add, list, get, remove};