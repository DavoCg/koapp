const fields = {
    user: ['email', 'password', 'firstname', 'lastname'],
    address: ['city', 'userid']
};

const hasUnauthorizedField =  (body, fields) => {
    return !Object.keys(body).every(field => fields.includes(field));
};

/**
 * Register body validation
 * @param body
 * @returns {{failed: boolean, message: string}}
 */
const register = (body) => {
    const {email} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.user)) messages.push(`Authorized fields ${JSON.stringify(fields.user)}`);
    if(email.length < 5) messages.push('Email length should be > 5');
    return {failed: messages.length > 0, message: messages.join(',')};
};

/**
 * Login body validation
 * @param body
 * @returns {{failed: boolean}}
 */
const login = (body) => {
    return {failed: false};
};

/**
 * Update user body validation (accept partial)
 * @param body
 * @returns {{failed: boolean}}
 */
const updateUser = (body) => {
    return {failed: false};
};

/**
 * Create address body validation (all required)
 * @param body
 * @returns {{failed: boolean}}
 */
const addAddress = (body) => {
    return {failed: false};
};

/**
 * Create address body validation (accept partial)
 * @param body
 * @returns {{failed: boolean}}
 */
const updateAddress = (body) => {
    return {failed: false};
};

module.exports = {register, login, updateUser, addAddress, updateAddress};