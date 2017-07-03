const {updateQuery, camel} = require('../helpers');
const Instagram = require('../../instagram');
const queries = require('./queries');

const getInstagramUserSelf = async (token) => {
    const instagram = Instagram({token});
    const result = await instagram.userSelf();
    const user = result.body.data;
    return {picture: user.profile_picture, username: user.username}
};

const me = async (ctx) => {
    const {user: userId, instagram: token} = ctx.state;
    const userInstagram = token && false ? await getInstagramUserSelf(token) : {};
    const q = queries.me();
    const user = await ctx.db.oneOrNone(q, {userId}).then(camel);
    return ctx.body = Object.assign(user, userInstagram);
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
    const {instagram: token} = ctx.state;
    const body = ctx.request.body;
    const values = updateQuery(body);
    const q = queries.update(values);
    await ctx.db.one(q, Object.assign({id}, body));
    const userInstagram = token ? await getInstagramUserSelf(token) : {};
    const user = await ctx.db.oneOrNone(queries.get(), {id}).then(camel);
    return ctx.body = Object.assign(user, userInstagram);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    const q = queries.remove();
    return ctx.body = await ctx.db.one(q, {id});
};

module.exports = {list, get, update, remove, me};