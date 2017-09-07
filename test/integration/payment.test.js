process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('payment', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['payment', 'customer']);

        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });

    });

    after(() => this.server.close());

    it.skip('should add a payment', (done) => {
        return done();
    });

    it.skip('should list all payments', (done) => {
        return done();
    });

    it.skip('should get one payment', (done) => {
        return done();
    });

    it.skip('should remove one payment', (done) => {
        return done();
    });

    it.skip('should not add a payment if missing field', (done) => {
        return done();
    });

    it.skip('should not add a payment if not authorized field', (done) => {
        return done();
    });

    it.skip('should list only user\'s payments', (done) => {
        return done();
    });

    it.skip('should list all payments if admin', (done) => {
        return done();
    });

    it.skip('should get only user\'s resources', (done) => {
        return done();
    });

    it.skip('should remove only user\'s payments', (done) => {
        return done();
    });
});