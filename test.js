//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let assert = require('assert');
let server = require('./index');
let expect = chai.expect;
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Product', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
     // expect( {Enable:true} ).to.deep.include( {Enable:true} );
    describe('/GET kenh-nguoi-ban', () => {
        it('abc', (done) => {
            chai.request(server)
                .get('/kenh-nguoi-ban')
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(6); // fixme :)
                    done();
                });
        });
    });
});
//
// Object.defineProperty(Object.prototype, 'should', {
//   set: shouldSetter
//   , get: shouldGetter
//   , configurable: true
// });
