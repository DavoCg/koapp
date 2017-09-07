process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');
const helpers = require('../helpers');

describe('favorite', function(){
    this.timeout(3000);

    before((done) => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        this.helpers = helpers(this.request, app.context.db);
        this.helpers.clear(['favorite', 'customer']);

        return this.helpers.token((token) => {
            this.token = token;
            return done();
        });

    });

    after(() => this.server.close());

    it.skip('should add a favorite', (done) => {
        return done();
    });

    it.skip('should add a favorite if missing field', (done) => {
        return done();
    });

    it.skip('should add a favorite if not authorized field', (done) => {
        return done();
    });

    it.skip('should list all favorites', (done) => {
        return done();
    });

    it.skip('should list all favorites with pagination', (done) => {
        return done();
    });

    it.skip('should remove one address', (done) => {
        return done();
    });

    it.skip('should be isFavorite if in favorite', (done) => {
        return done();
    });

    it.skip('should not be isFavorite if not in favorite', (done) => {
        return done();
    });
});