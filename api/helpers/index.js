const getUpdateQuery = (body) => {
    return Object.keys(body).reduce((acc, curr) => acc + `${curr} = $(${curr}) `, '');
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

module.exports = {getUpdateQuery, getAddQuery};