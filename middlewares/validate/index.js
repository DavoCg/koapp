const HTTPStatus = require('http-status');
const validators = require('./validators');

/**
 * Return a middleware for body validation
 * @param validate
 * @returns {Function}
 */
const validation = (validate) => {
    return (ctx, next) => {
        const body = ctx.request.body;
        const validation = validate(body);
        return validation.failed
            ? ctx.throw(validation.message, HTTPStatus.BAD_REQUEST)
            : next();
    }
};

module.exports = {
    register: validation(validators.register),
    login: validation(validators.login),
    updateUser: validation(validators.updateUser),
    addAddress: validation(validators.addAddress),
    updateAddress: validation(validators.updateAddress),
    addPayment: validation(validators.addPayment)
};