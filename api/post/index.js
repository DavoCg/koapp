const {updateQuery, addQuery, camel} = require('../helpers');
const queries = require('./queries');
const Instagram = require('../../instagram');

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
    const instagram = Instagram({token: ctx.state.instagram});
    const post = await instagram.media(body.mediaId);
    const data = post.body.data;

    // todo handle if not from instagram
    
    const payload = {
        userId: userId,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        instagramPostId: data.id,
        picture: data.images.standard_resolution.url
    };

    const {keys, values} = addQuery(payload);
    const q = queries.add(keys, values);
    return ctx.body = await ctx.db.one(q, payload);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    const instagram = Instagram({token: ctx.state.instagram});
    const q = queries.get();
    const post = await ctx.db.oneOrNone(q, {id}).then(camel);
    const igPost = await instagram.media(post.instagramPostId);
    const likes = igPost.body.data.likes.count;
    return ctx.body = Object.assign({likes}, post);
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