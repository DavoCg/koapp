const fields = {
    login: ['email', 'password'],
    register: ['email', 'password', 'firstname', 'lastname'],
    payment: ['cardId'],
    address: ['city', 'zip']
};

const hasUnauthorizedField =  (body, fields) => {
    return !Object.keys(body).every(field => fields.includes(field));
};

const register = (body) => {
    const {email} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.register)) messages.push(`Authorized fields ${JSON.stringify(fields.register)}`);
    if(email.length < 5) messages.push('Email length should be > 5');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const login = (body) => {
    const {email, password} = body;
    const messages = [];
    if(hasUnauthorizedField(body, fields.login)) messages.push(`Authorized fields ${JSON.stringify(fields.login)}`);
    if(!email || email.length < 5) messages.push('Email length should be > 5');
    if(!password) messages.push('Password missing');
    return {failed: messages.length > 0, message: messages.join(',')};
};

const updateUser = (body) => {
    return {failed: false};
};

const addAddress = (body) => {
    return {failed: false};
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