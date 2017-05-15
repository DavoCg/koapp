const getUpdateQuery = (body) => {
    return Object.keys(body)
        .reduce((acc, curr) => acc.concat([`${curr} = $(${curr})`]), [])
        .join(',');
};

const getAddQuery = (body) => {
    const data = Object.keys(body).reduce((acc, curr) => ({
        keys: acc.keys.concat([curr]),
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

module.exports = {getUpdateQuery, getAddQuery, error};