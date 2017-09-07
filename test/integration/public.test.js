process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('public', function(){
    this.timeout(3000);

    before(async () => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        await this.helpers.clear('customer');
    });

    after(() => this.server.close());

    it('should register an user', (done) => {
        this.request
            .post('/public/register')
            .send({email: 'david.cingala@baloo.com', password: 'davo'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const body = response.body;
                expect(body).to.have.property('token');
                return done();
            }).catch(err => {throw err})
    });

    it('should login an user', (done) => {
        this.request
            .post('/public/login')
            .send({email: 'david.cingala@baloo.com', password: 'davo'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                const body = response.body;
                expect(body).to.have.property('token');
                return done();
            }).catch(err => {throw err})
    });

    it.skip('should login an user with Instagram', (done) => {
        return done();
    });
});