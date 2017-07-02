const {updateQuery, camel} = require('../helpers');
const Instagram = require('../../instagram');

const getInstagramUserSelf = async (token) => {
    const instagram = Instagram({token});
    const result = await instagram.userSelf();
    const user = result.body.data;
    return {picture: user.profile_picture, username: user.username}
};

const me = async (ctx) => {
    const {user: userId, instagram: token} = ctx.state;
    const userInstagram = token && false ? await getInstagramUserSelf(token) : {};
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE id=$(userId)', {userId}).then(camel);
    return ctx.body = Object.assign(user, userInstagram);
};

const list = async (ctx) => {
    return ctx.body = await ctx.db.any('SELECT * FROM customer').then(camel);
};

const get = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.oneOrNone('SELECT * FROM customer WHERE id=$(id)', {id}).then(camel);
};

const update = async (ctx) => {
    const {id} = ctx.params;
    const {instagram: token} = ctx.state;
    const body = ctx.request.body;
    const values = updateQuery(body);
    await ctx.db.one(`UPDATE customer SET ${values} WHERE id=$(id) RETURNING id`, Object.assign({id}, body));
    const userInstagram = token ? await getInstagramUserSelf(token) : {};
    const user = await ctx.db.oneOrNone('SELECT * FROM customer WHERE id=$(id)', {id}).then(camel)
    return ctx.body = Object.assign(user, userInstagram);
};

const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM customer WHERE id=$(id) RETURNING id', {id});
};

module.exports = {list, get, update, remove, me};