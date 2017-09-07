const list = () => {
    return `
        SELECT *
        FROM order_post
        WHERE user_id=$(userId)`;
};

const add = (keys, values) => {
    return `
        INSERT INTO order_post(${keys})
        VALUES(${values})
        RETURNING id`;
};

const getCart = () => {
    return `
        SELECT *
        FROM cart_post
        WHERE user_id=$(userId)`;
};

const getPost = () => {
    return `
        SELECT *
        FROM post
        WHERE id=$(postId)`;
};

const getOrder = () => {
    return `
        SELECT o.id, o.quantity, o.user_id, c.username, p.price, p.picture
        FROM order_post o
        INNER JOIN post p
        ON o.post_id = p.id
        INNER JOIN customer c
        ON p.user_id = c.id
        WHERE o.reference=$(reference)`;
};

module.exports = {list, add, getCart, getPost, getOrder};


