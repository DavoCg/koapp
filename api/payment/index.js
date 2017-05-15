const HTTPStatus = require('http-status');
const {getAddQuery, error} = require('../helpers');

/**
 * Add an payment for the given user
 * @param ctx
 * @returns {*}
 */
const add = async (ctx) => {
    const {cardId} = ctx.request.body;
    const userId = ctx.state.user;
    const stripe = ctx.state.stripe;
    const source = await ctx.stripe.customers.createSource(stripe, {source: cardId});
    const payload = {stripeid: source.id, brand: source.brand, last4: source.last4, userid: userId};
    const {keys, values} = getAddQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO payment(${keys}) VALUES(${values}) RETURNING id`, payload);
};

/**
 * List all payment
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    const user = ctx.state.user;
    const query = ctx.state.admin
        ? 'SELECT * FROM payment'
        : 'SELECT * FROM payment WHERE userid=$(id)';

    return ctx.body = await ctx.db.any(query, {id: user});
};

/**
 * Get an payment based on id
 * @param ctx
 * @returns {*}
 */
const get = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.oneOrNone('SELECT * FROM payment WHERE id=$(id)', {id});
};

/**
 * Remove an payment by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    const card = await ctx.db.oneOrNone('SELECT * FROM payment WHERE id=$(id)', {id});
    const stripe = ctx.state.stripe;
    const cardId = card.stripeid;
    await ctx.stripe.customers.deleteCard(stripe, cardId).catch(error(HTTPStatus.BAD_REQUEST, 'Problem deleting card id:'));
    return ctx.body = await ctx.db.one('DELETE FROM payment WHERE id=$(id) RETURNING id', {id});
};

module.exports = {add, list, get, remove};