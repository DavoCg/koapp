const md5 = require('md5');

/**
 * Register body formatting
 * @param body
 * @returns {{failed: boolean, message: string}}
 */
const register = (body) => {
    return Object.assign({}, body, {
        password: md5(body.password)
    });
};

/**
 * Login body formatting
 * @param body
 * @returns {{failed: boolean}}
 */
const login = (body) => {
    return Object.assign({}, body, {
        password: md5(body.password)
    });
};

/**
 * Update user body formatting
 * @param body
 * @returns {{failed: boolean}}
 */
const updateUser = (body) => {
    return body;
};

/**
 * Create address body formatting
 * @param body
 * @returns {{failed: boolean}}
 */
const addAddress = (body) => {
    return body;
};

/**
 * Create address body formatting
 * @param body
 * @returns {{failed: boolean}}
 */
const updateAddress = (body) => {
    return body;
};

module.exports = {register, login, updateUser, addAddress, updateAddress};