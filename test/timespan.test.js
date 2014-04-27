var timespan = require('../src/timespan');
var expect = require('chai').expect;

describe("timespan", function () {

    describe("initialization", function () {
        it("no parameters should create zero timespan", function () {
            expect(timespan().totalMiliseconds()).to.be.equal(0);
        });

        it("number initialization should create appropriate timespan value", function () {
            expect(timespan(250).totalMiliseconds()).to.be.equal(250);
        });

        it("should parse value from formatted string", function () {
            var ms = (((10 * 60) + 20) * 60 + 30) * 1000 + 678;
            expect(timespan("10:20:30.678", "hh:mm:ss.fff").totalMiliseconds()).to.be.equal(ms);
        });

        it("should return null if the value is not formatted with given format", function () {
            expect(timespan("10:20:30.4", "hh:mm:ss.fff")).to.be.equal(null);
        });
    });

});

