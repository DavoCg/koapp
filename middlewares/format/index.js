const format = require('./format');

/**
 * Return a middleware for body formatting
 * @param format
 * @returns {Function}
 */
const formatting = (format) => {
    return (ctx, next) => {
        ctx.request.body = format(ctx.request.body);
        return next();
    }
};

module.exports = {
    register: formatting(format.register),
    login: formatting(format.login),
    updateUser: formatting(format.updateUser),
    addAddress: formatting(format.addAddress),
    updateAddress: formatting(format.updateAddress),
    addPayment: formatting(format.addPayment)
};