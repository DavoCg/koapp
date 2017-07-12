const list = (page, limit) => {
    return `
        SELECT favorite.id, favorite.post_id, username, quantity, price, picture
        FROM post
        JOIN customer
        ON post.user_id = customer.id
        JOIN favorite ON favorite.post_id = post.id
        WHERE favorite.user_id=$(userId)
        LIMIT ${limit}
        OFFSET ${(page - 1) * limit}`;
};

const add = (keys, values) => {
    return `
        INSERT INTO favorite(${keys})
        VALUES(${values})
        RETURNING id`;
};

const isFavorite = () => {
    return `
        SELECT id
        FROM favorite
        WHERE user_id=$(userId)
        AND post_id=$(postId)`;
};

const remove = () => {
    return `
        DELETE FROM favorite
        WHERE id=$(id)
        RETURNING id`;
};

module.exports = {list, add, isFavorite, remove};