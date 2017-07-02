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

module.exports = {list, add, getCart, getPost};