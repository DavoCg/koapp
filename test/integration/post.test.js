process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('post', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['post', 'customer']);

        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });

    });

    after(() => this.server.close());

    it.skip('should list all post', (done) => {
        return done();
    });

    it.skip('should list all filtered post if search filter', (done) => {
        return done();
    });

    it.skip('should list all post with pagination', (done) => {
        return done();
    });

    it.skip('should not list all post if no limit', (done) => {
        return done();
    });

    it.skip('should not list all post if no page', (done) => {
        return done();
    });

    it.skip('should list trends', (done) => {
        return done();
    });

    it.skip('should add a post from Instagram', (done) => {
        return done();
    });

    it.skip('should add a post not from instagram', (done) => {
        return done();
    });

    it.skip('should not add a post if missing required field', (done) => {
        return done();
    });

    it.skip('should not add a post if not authorized field', (done) => {
        return done();
    });

    it.skip('should get one post', (done) => {
        return done();
    });

    it.skip('should update one post', (done) => {
        return done();
    });

    it.skip('should not update one post if not owner', (done) => {
        return done();
    });

    it.skip('should not update one post if not authorized field', (done) => {
        return done();
    });

    it.skip('should not update one post if already in processing order', (done) => {
        return done();
    });

    it.skip('should not remove one post if not owner', (done) => {
        return done();
    });

    it.skip('should not remove one post if already in processing order', (done) => {
        return done();
    });
});