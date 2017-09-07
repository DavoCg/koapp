process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('address', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['address', 'customer']);
        
        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });
        
    });

    after(() => this.server.close());

    it.skip('should add an address', (done) => {
        return done();
    });

    it.skip('should list all addresses', (done) => {
        return done();
    });

    it.skip('should get one address', (done) => {
        return done();
    });

    it.skip('should update one address', (done) => {
        return done();
    });

    it.skip('should remove one address', (done) => {
        return done();
    });

    it.skip('should not add an address if missing field', (done) => {
        return done();
    });

    it.skip('should not add an address if not authorized field', (done) => {
        return done();
    });

    it.skip('should list only user\'s addresses', (done) => {
        return done();
    });

    it.skip('should list all addresses if admin', (done) => {
        return done();
    });

    it.skip('should get only user\'s resources', (done) => {
        return done();
    });

    it.skip('should not update an address if not authorized field', (done) => {
        return done();
    });

    it.skip('should remove only user\'s addresses', (done) => {
        return done();
    });
});