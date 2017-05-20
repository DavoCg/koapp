const {getUpdateQuery, getAddQuery} = require('../helpers');
const Instagram = require('../../instagram');

/**
 * List all posts
 * @param ctx
 * @returns {*}
 */
const list = async (ctx) => {
    const {limit, page, userid} = ctx.query;
    const q = userid
        ? `SELECT * FROM post WHERE userid=$(id) LIMIT ${limit} OFFSET ${(page - 1) * limit}`
        : `SELECT * FROM post LIMIT ${limit} OFFSET ${(page - 1) * limit}`;

    return ctx.body = await ctx.db.any(q, {id: userid});
};

/**
 * Add an address for the given user
 * @param ctx
 * @returns {*}
 */
const add = async (ctx) => {
    const body = ctx.request.body;
    const userId = ctx.state.user;
    const instagram = Instagram({token: ctx.state.instagram});
    const post = await instagram.media(body.mediaId);
    const data = post.body.data;
    
    const payload = {
        userId: userId,
        price: body.price,
        instagrampostid: data.id,
        picture: data.images.standard_resolution.url
    };

    const {keys, values} = getAddQuery(payload);
    return ctx.body = await ctx.db.one(`INSERT INTO post(${keys}) VALUES(${values}) RETURNING id`, payload);
};

/**
 * Get one post based on id
 * @param ctx
 * @returns {*}
 */
const get = async (ctx) => {
    const {id} = ctx.params;
    const instagram = Instagram({token: ctx.state.instagram});
    const post = await ctx.db.oneOrNone('SELECT * FROM post WHERE id=$(id)', {id});
    const igPost = await instagram.media(post.instagrampostid);
    const likes = igPost.body.data.likes.count;
    return ctx.body = Object.assign({likes}, post);
};

/**
 * Update a post by id (update only fields in body)
 * @param ctx
 * @returns {*}
 */
const update = async (ctx) => {
    const {id} = ctx.params;
    const body = ctx.request.body;
    const values = getUpdateQuery(body);
    return ctx.body = await ctx.db.one(`UPDATE post SET ${values} WHERE id=$(id) RETURNING id`, Object.assign({id}, body));
};

/**
 * Remove a post by id
 * @param ctx
 * @returns {*}
 */
const remove = async (ctx) => {
    const {id} = ctx.params;
    return ctx.body = await ctx.db.one('DELETE FROM post WHERE id=$(id) RETURNING id', {id});
};

module.exports = {list, get, update, remove, add};