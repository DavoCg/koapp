const {addQuery, camel} = require('../helpers');

const groupByReference = (orders) => {
    return orders.reduce((acc, curr) => {
        const {reference, post, quantity, status, id} = curr;
        const index = acc.findIndex(a => a.reference === reference);
        const order = {post, quantity, status, id};
        const {price} = post;
        if(index < 0) acc.push({reference, price, items: [order]});
        else {
            acc[index].price = acc[index].price + price;
            acc[index].items.push(order);
        }
        return acc;
    }, []);
};

const decrementQuantity = async (id, amount) => {
    // todo implement decrement
    return new Promise((res, rej) => res());
};

const getCart = async (ctx, userId) => {
    const cart = await ctx.db.any('SELECT * FROM cart_post WHERE user_id=$(userId)', {userId}).then(camel);
    return cart.reduce((acc, x) => {
        acc.ids.push(x.postId);
        acc.cartItemIds.push(x.id);
        return acc;
    }, {ids: [], cartItemIds: []});
};

const add = async (ctx) => {
    const {} = ctx.request.body;
    const userId = ctx.state.user;
    const reference = Date.now();
    const {ids, cartItemIds} = await getCart(ctx, userId);

    // todo check if quantity of each product > 1 or simply remove from order

    return ctx.body = await Promise.all(ids.map(postId => {
        const payload = {reference, userId, postId, quantity: 1};
        const {keys, values} = addQuery(payload);
        return ctx.db.one(`INSERT INTO order_post(${keys}) VALUES(${values}) RETURNING id`, payload)
    }));
};

const list = async (ctx) => {
    const userId = ctx.state.user;
    const orders = await ctx.db.any('SELECT * FROM order_post WHERE user_id=$(userId)', {userId}).then(camel);
    const posts = await Promise.all(orders.map(order => ctx.db.one('SELECT * FROM post WHERE id=$(postId)', {postId: order.postId}).then(camel)));
    const ordersWithPost = orders.map((order, i) => Object.assign(order, {post: posts[i]}));
    return ctx.body = groupByReference(ordersWithPost);
};

module.exports = {add, list};