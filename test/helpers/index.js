const async = require('neo-async');

const fixtures = {
    addresses: [{}, {}, {}]
};


module.exports = (request, db) => {
    const token = (done) => {
        request
            .post('/public/register')
            .send({email: 'dgame@test.com', password: 'davo'})
            .set('Accept', 'application/json')
            .then(res => done(res.body.token))
    };

    const clear = (name) => {
        Array.isArray(name) || (name = [name]);
        return db.tx(t => t.batch(name.map(n => db.none(`TRUNCATE ${n} CASCADE`))));
    };

    const add = ({type, nb = 1}, done) => {
        const data = fixtures[type].splice(0, nb);
        return async.eachSeries(data, (payload, cb) => {
            return request
                .post(`/${type}`)
                .send(payload)
                .set('Accept', 'application/json')
                .end(cb);
        }, done);
    };

    return {token, add, clear};
};