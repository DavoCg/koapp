process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;
const app = require('../..');

describe('user', function(){
    this.timeout(3000);

    before(() => {
        this.server = app.listen(3004);
        this.request = supertest(this.server);
        //app.context.db.none('TRUNCATE address CASCADE')
    });
    after(() => this.server.close());

    it('', (done) => {
        return done();
    });
});