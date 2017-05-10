/**
 * Middleware for performance log
 * @param ctx
 * @param next
 */
const logger = async (ctx, next) => {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    console.log(`${ctx.status} ${ctx.method} ${ctx.path} - ${duration} ms`);
};

module.exports = logger;