process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('cart', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['cart_post', 'customer']);

        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });

    });

    after(() => this.server.close());

    it.skip('should add a post to cart', (done) => {
        return done();
    });

    it.skip('should list cart', (done) => {
        return done();
    });

    it.skip('should remove one post from cart', (done) => {
        return done();
    });

    it.skip('should not add to cart if quantity < 0', (done) => {
        return done();
    });

    it.skip('should not add to cart if missing field', (done) => {
        return done();
    });

    it.skip('should not add to cart if not authorized field', (done) => {
        return done();
    });

    it.skip('should empty cart after order validation', (done) => {
        return done();
    });
});