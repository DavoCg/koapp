const list = () => {
    return `
        SELECT *
        FROM customer`;
};

const me = () => {
    return `
        SELECT *
        FROM customer
        WHERE id=$(userId)`;
};

const get = () => {
    return `
        SELECT *
        FROM customer
        WHERE id=$(id)`;
};

const update = (values) => {
    return `
        UPDATE customer
        SET ${values}
        WHERE id=$(id)
        RETURNING id`;
};

const remove = () => {
    return `
    DELETE FROM customer
    WHERE id=$(id)
    RETURNING id`;
};

module.exports = {list, me, get, update, remove};