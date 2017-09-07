const findUser = () => {
    return `
        SELECT *
        FROM customer
        WHERE email=$(email)`;
};

const add = (keys, values) => {
    return `
        INSERT INTO customer(${keys})
        VALUES(${values})
        RETURNING id`;
};

module.exports = {findUser, add};