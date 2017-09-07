process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('order', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['order_post', 'customer']);

        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });

    });

    after(() => this.server.close());

    it.skip('should list all orders', (done) => {
        return done();
    });

    it.skip('should add an order', (done) => {
        return done();
    });

    it.skip('should remove post from order when quantity < 1', (done) => {
        return done();
    });
});