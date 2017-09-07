const validator = require('validator');

const fields = {
    login: ['email', 'password'],
    register: ['email', 'password', 'username'],
    payment: ['cardId'],
    address: ['number', 'street', 'city', 'zip', 'phone', 'additional']
};

const hasUnauthorizedField =  (body, fields) => {
    return !Object.keys(body).every(field => fields.includes(field));
};

const register = (body) => {
    const {email, username, password} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.register)) messages.push(`Authorized fields ${JSON.stringify(fields.register)}`);
    if(!email || !validator.isEmail(email)) messages.push('Should provide a valid email');
    if(!username) messages.push('Should provide an username');
    if(!password) messages.push('Should provide a password');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const login = (body) => {
    const {email, password} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.login)) messages.push(`Authorized fields ${JSON.stringify(fields.login)}`);
    if(!email || !validator.isEmail(email)) messages.push('Should provide a valid email');
    if(!password) messages.push('Password missing');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const updateUser = (body) => {
    return {failed: false};
};

const addAddress = (body) => {
    const messages = [];
    if(hasUnauthorizedField(body, fields.address)) messages.push(`Authorized fields ${JSON.stringify(fields.address)}`);
    if(!body.number) messages.push('Number missing');
    if(!body.street) messages.push('Street missing');
    if(!body.city) messages.push('City missing');
    if(!body.zip) messages.push('Zip missing');
    if(!body.phone) messages.push('Phone missing');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const updateAddress = (body) => {
    const messages = [];
    if(hasUnauthorizedField(body, fields.address)) messages.push(`Authorized fields ${JSON.stringify(fields.address)}`);
    return {failed: messages.length > 0, message: messages.join(',')};
};

const addPayment = (body) => {
    const {cardId} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.payment)) messages.push(`Authorized fields ${JSON.stringify(fields.payment)}`);
    if(!cardId) messages.push('Missing cardId');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const addPost = (body) => {
    return {failed: false};
};

const updatePost = (body) => {
    return {failed: false};
};

const addFavorite = (body) => {
    return {failed: false};
};

const addCart = (body) => {
    return {failed: false};
};

const addOrder = (body) => {
    return {failed: false};
};


module.exports = {register, login, updateUser, addAddress, updateAddress, addPayment, addPost, updatePost, addFavorite, addCart, addOrder};