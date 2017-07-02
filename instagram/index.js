const request = require('superagent');
const API = 'https://api.instagram.com/v1/';

module.exports = (options = {}) => {
    const token = options.token;
    //if(!token) throw new Error('No instagram token provided');

    const login = (code) => request
        .post('https://api.instagram.com/oauth/access_token')
        .type('form')
        .send({
            code: code,
            client_secret: 'f701cfbd7c2e49acb40c395b1b7b625e',
            client_id: 'ef34e21efa4241729ab23cc8f76052c3',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3003/public/auth/code'
        });

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
        login: (code) => login(code),
        userSelf: () => get('users/self'),
        user: (id) => get(`users/${id}`),
        mediasSelf: () => get('users/self/media/recent'),
        medias: (id) => get(`users/${id}/media/recent`),
        media: (id) => get(`media/${id}`)
    }
};