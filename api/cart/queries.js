const list = () => {
    return `
        SELECT p.id, customer.username, p.picture, p.price, p.user_id, p.instagram_post_id, p.quantity, p.description, c.id AS cart_post_id
        FROM cart_post c
        JOIN post p
        ON c.post_id = p.id
        JOIN customer
        ON p.user_id = customer.id
        WHERE c.user_id=$(userId)`;
};

const add = (keys, values) => {
    return `
        INSERT INTO cart_post(${keys})
        VALUES(${values})
        RETURNING id`;
};

const remove = () => {
    return `
        DELETE FROM cart_post
        WHERE id=$(id)
        RETURNING id`;
};

module.exports = {list, add, remove};