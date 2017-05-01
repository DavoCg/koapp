const request = require('superagent');
const API = 'https://api.instagram.com/v1/';

module.exports = (options = {}) => {
    const token = options.token || '1296390747.ef34e21.5d89f308e053429c95f24ecd4e05663f';
    if(!token) throw new Error('No instagram token provided');

    /**
     * GET Request
     * @param path
     */
    const get = (path) => request
        .get(API + path)
        .query({access_token: token});

    /**
     * POST Request
     * @param path
     */
    const post = (path) => request
        .post(API + path)
        .query({access_token: token});

    /**
     * Available endpoint
     */
    return {
        userSelf: () => get('users/self'),
        user: (id) => get(`users/${id}`),
        mediasSelf: () => get('users/self/media/recent'),
        medias: (id) => get(`users/${id}/media/recent`),
        media: (id) => get(`media/${id}`)
    }
};