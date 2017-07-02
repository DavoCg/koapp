const HTTPStatus = require('http-status');
const config = require('../../config');
const {camel} = require('../../api/helpers');

/**
 * return Middleware for checking if user can update/del/get a resource
 * @param table
 * @returns {Function}
 */
const isMe = (table) => {
    return async (ctx, next) => {
        const {user, admin} = ctx.state;
        const id = ctx.params.id;
        const resource = await ctx.db.oneOrNone(`SELECT * FROM ${table} WHERE id=$(id)`, {id}).then(camel);
        ctx.assert(resource && resource.id, HTTPStatus.NOT_FOUND, `Cannot find resource ${id}`);

        // If resource dont have userId ==> resource is a user
        const isMyResource = resource.userId ? user == resource.userId : user == resource.id;
        const isAuthorized = admin || isMyResource;

        return !isAuthorized
            ? ctx.throw('Should be admin or owner to access this route', HTTPStatus.UNAUTHORIZED)
            : next();
    };
};

module.exports = isMe;