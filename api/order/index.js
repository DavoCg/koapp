const {addQuery, camel} = require('../helpers');
const queries = require('./queries');

const groupByReference = (orders) => {
    return orders.reduce((acc, curr) => {
        const {reference, picture, quantity, status, id} = curr;
        const index = acc.findIndex(a => a.reference === reference);
        const order = {picture, quantity, status, id};
        if(index < 0) acc.push({reference, items: [order]});
        else acc[index].items.push(order);
        return acc;
    }, []);
};

const groupByUser = (orders) => {
    return orders.reduce((acc, curr) => {
        const {username} = curr;
        const index = acc.findIndex(a => a.key === username);
        if(index < 0) acc.push({label: username, key: username, data: [curr]});
        else acc[index].data.push(curr);
        return acc;
    }, []);
};

const getCart = async (ctx, userId) => {
    const q = queries.getCart();
    const cart = await ctx.db.any(q, {userId}).then(camel);
    return cart.reduce((acc, x) => {
        acc.ids.push(x.postId);
        acc.cartItemIds.push(x.id);
        return acc;
    }, {ids: [], cartItemIds: []});
};

// todo check if quantity of each product > 1 or simply remove from order
const add = async (ctx) => {
    const {} = ctx.request.body;
    const userId = ctx.state.user;
    const reference = Date.now();
    const {ids, cartItemIds} = await getCart(ctx, userId);

    return ctx.body = await Promise.all(ids.map(postId => {
        const payload = {reference, userId, postId, quantity: 1};
        const {keys, values} = addQuery(payload);
        const q = queries.add(keys, values);
        return ctx.db.one(q, payload)
    }));
};

const list = async (ctx) => {
    const userId = ctx.state.user;
    const q = queries.list();
    const orders = await ctx.db.any(q, {userId}).then(camel);
    const firstPost = await ctx.db.one(queries.getPost(), {postId: orders[0].postId}).then(camel);
    orders[0] = Object.assign({picture: firstPost.picture}, orders[0]);
    return ctx.body = groupByReference(orders);
};

const get = async (ctx) => {
    const {reference} = ctx.params;
    const orders = await ctx.db.any(queries.getOrder(), {reference: reference}).then(camel);
    return ctx.body = groupByUser(orders);
};


module.exports = {add, list, get};