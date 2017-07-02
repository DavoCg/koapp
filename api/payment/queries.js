const list = (admin) => {
    return admin
        ? 'SELECT * FROM payment'
        : 'SELECT * FROM payment WHERE user_id=$(userId)';
};

const add = (keys, values) => {
    return `
        INSERT INTO payment(${keys})
        VALUES(${values})
        RETURNING id`;
};

const get = () => {
    return `
        SELECT *
        FROM payment
        WHERE id=$(id)`;
};

const remove = () => {
    return `
        DELETE FROM payment
        WHERE id=$(id)
        RETURNING id`
};

module.exports = {list, add, get, remove};