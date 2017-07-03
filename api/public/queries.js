const findUser = () => {
    return `
        SELECT *
        FROM customer
        WHERE email=$(email)`;
};

const findInstagramUser = () => {
    return `
        SELECT *
        FROM customer
        WHERE instagram_id=$(id)`;
};

const add = (keys, values) => {
    return `
        INSERT INTO customer(${keys})
        VALUES(${values})
        RETURNING id`;
};

module.exports = {findUser, findInstagramUser, add};