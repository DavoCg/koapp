const fields = {
    login: ['email', 'password'],
    register: ['email', 'password', 'firstname', 'lastname'],
    payment: ['cardId'],
    address: ['city', 'zip']
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
    if(hasUnauthorizedField(body, fields.register)) messages.push(`Authorized fields ${JSON.stringify(fields.register)}`);
    if(email.length < 5) messages.push('Email length should be > 5');
    return {failed: messages.length > 0, message: messages.join(',')};
};

/**
 * Login body validation
 * @param body
 * @returns {{failed: boolean}}
 */
const login = (body) => {
    const {email, password} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.login)) messages.push(`Authorized fields ${JSON.stringify(fields.login)}`);
    if(!email || email.length < 5) messages.push('Email length should be > 5');
    if(!password) messages.push('Password missing');
    return {failed: messages.length > 0, message: messages.join(',')};
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
    const messages = [];
    if(hasUnauthorizedField(body, fields.address)) messages.push(`Authorized fields ${JSON.stringify(fields.address)}`);
    return {failed: messages.length > 0, message: messages.join(',')};
};

/**
 * Create payment body validation (all required)
 * @param body
 * @returns {{failed: boolean}}
 */
const addPayment = (body) => {
    const {cardId} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.payment)) messages.push(`Authorized fields ${JSON.stringify(fields.payment)}`);
    if(!cardId) messages.push('Missing cardId');
    return {failed: messages.length > 0, message: messages.join(',')};
};

module.exports = {register, login, updateUser, addAddress, updateAddress, addPayment};