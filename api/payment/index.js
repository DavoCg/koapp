const HTTPStatus = require('http-status');
const {addQuery, error, camel} = require('../helpers');

const add = async (ctx) => {
    const {cardId} = ctx.request.body;
    const userId = ctx.state.user;
    const stripe = ctx.state.stripe;
    const source = await ctx.stripe.customers.createSource(stripe, {source: cardId});
    const payload = {stripeId: source.id, brand: source.brand, last4: source.last4, userId};
    const {keys, values} = addQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO payment(${keys}) VALUES(${values}) RETURNING id`, payload);
};

const list = async (ctx) => {
    const userId = ctx.state.user;
    const query = ctx.state.admin
        ? 'SELECT * FROM payment'
        : 'SELECT * FROM payment WHERE user_id=$(userId)';

    return ctx.body = await ctx.db.any(query, {userId}).then(camel);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.oneOrNone('SELECT * FROM payment WHERE id=$(id)', {id}).then(camel);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const card = await ctx.db.oneOrNone('SELECT * FROM payment WHERE id=$(id)', {id});
    const stripe = ctx.state.stripe;
    const cardId = card.stripeid;
    await ctx.stripe.customers.deleteCard(stripe, cardId).catch(error(HTTPStatus.BAD_REQUEST, 'Problem deleting card id:'));
    return ctx.body = await ctx.db.one('DELETE FROM payment WHERE id=$(id) RETURNING id', {id});
};

module.exports = {add, list, get, remove};