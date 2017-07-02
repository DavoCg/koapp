const _ = require('lodash');

const updateQuery = (body) => {
    return Object.keys(body)
        .reduce((acc, curr) => acc.concat([`${_.snakeCase(curr)} = $(${curr})`]), [])
        .join(',');
};

const addQuery = (body) => {
    const data = Object.keys(body).reduce((acc, curr) => ({
        keys: acc.keys.concat([_.snakeCase(curr)]),
        values: acc.values.concat([`$(${curr})`])
    }), {keys: [], values: []});

    return {
        keys: data.keys.join(','),
        values: data.values.join(',')
    }
};

const error = (status, message) => {
    return (e) => {
        const error = new Error();
        error.status = status;
        error.message = message;
        throw error;
    }
};

const camel = (data) => {
    const d = Array.isArray(data)
        ? data.map(camelify)
        : camelify(data);

    return new Promise(resolve => resolve(d));
};

const camelify = (o) => {
    return _.mapKeys(o, (v, k) => _.camelCase(k));
};

module.exports = {updateQuery, addQuery, error, camel};