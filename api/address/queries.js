const list = (admin) => {
    return admin
        ? 'SELECT * FROM address'
        : 'SELECT * FROM address WHERE user_id=$(userId)';
};

const add = (keys, values) => {
    return `
        INSERT INTO address(${keys})
        VALUES(${values})
        RETURNING id
    `;
};

const get = () => {
    return `
        SELECT *
        FROM address
        WHERE id=$(id)
    `;
};

const update = (values) => {
    return `
        UPDATE address
        SET ${values}
        WHERE id=$(id)
        RETURNING id
    `;
};

const remove = () => {
    return `
        DELETE FROM address
        WHERE id=$(id)
        RETURNING id
    `;
};

module.exports = {list, add, get, update, remove};