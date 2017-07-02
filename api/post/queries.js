const list = (userId, limit, page) => {
    return userId
    ? `
        SELECT p.id, p.user_id, c.username, p.quantity, p.price, p.picture
        FROM post p
        JOIN customer c
        ON p.user_id = c.id
        WHERE user_id=$(userId)
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
    `
    : `
        SELECT p.id, p.user_id, c.username, p.quantity, p.price, p.picture
        FROM post p
        JOIN customer c
        ON p.user_id = c.id
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}
    `;
};

const listTrends = () => {
    return `
        SELECT p.id, p.user_id, c.username, p.quantity, p.price, p.picture
        FROM post p
        JOIN customer c
        ON p.user_id = c.id
        LIMIT 5
    `;
};

const add = (keys, values) => {
    return `
        INSERT INTO post(${keys})
        VALUES(${values})
        RETURNING id
    `;
};

const get = () => {
    return `
        SELECT p.id, p.user_id, c.username, p.quantity, p.price, p.picture
        FROM post p
        JOIN customer c
        ON p.user_id = c.id
        WHERE id=$(id)
    `;
};

const update = (values) => {
    return `
        UPDATE post
        SET ${values}
        WHERE id=$(id)
        RETURNING id
    `;
};

const remove = () => {
    return `
        DELETE FROM post
        WHERE id=$(id)
        RETURNING id
    `;
};

module.exports = {list, listTrends, add, get, update, remove};