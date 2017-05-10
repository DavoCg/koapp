const HTTPStatus = require('http-status');

/**
 * Middleware for error handling
 * @param ctx
 * @param next
 */
const error = async (ctx, next) => {
    try {await next();}
    catch(err) {
        ctx.status = err.status || HTTPStatus.INTERNAL_SERVER_ERROR;
        ctx.body = {message: err.message};
        console.log('Error', `${err.status} ${ctx.method} ${ctx.path} : ${err.message}`);
        ctx.app.emit('error', err, ctx);
    }
};

module.exports = error;