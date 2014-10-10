var timespan = require('../src/timespan');
var expect = require('chai').expect;

describe('timespan', function () {

    describe('initialization', function () {
        it('no parameters should create zero timespan', function () {
            expect(timespan().totalMiliseconds()).to.be.equal(0);
        });

        it('number initialization should create appropriate timespan value', function () {
            expect(timespan(250).totalMiliseconds()).to.be.equal(250);
        });

        it('should parse value from formatted string', function () {
            var ms = 37230678;
            expect(timespan('10:20:30.678', 'hh:mm:ss.fff').totalMiliseconds()).to.be.equal(ms);
        });

        it('should return null if the value is not formatted with given format', function () {
            expect(timespan('10:20:30.4', 'hh:mm:ss.fff')).to.be.equal(null);
        });
        it('should parse value with tenthformat', function () {
            expect(timespan('10:20:30.40', 'hh:mm:ss.ff').totalMiliseconds()).to.be.equal(37230400);
        });
        it('should parse value with tenthformat starting with 0', function () {
            expect(timespan('10:20:30.04', 'hh:mm:ss.ff').totalMiliseconds()).to.be.equal(37230040);
        });
    });

    describe('formatting', function () {
        it ('should format with default formatting', function() {
            expect(timespan(37230678).format()).to.be.equal('10:20:30.678');            
        });
        it ('should format with custom separators', function() {
            expect(timespan(37230678).format('hh+mm|ss/fff')).to.be.equal('10+20|30/678');            
        });

        it ('should format with custom format', function() {
            expect(timespan(37230678).format('mm:ss.fff')).to.be.equal('20:30.678');            
        });

        it ('should format with two place miliseconds', function() {
            expect(timespan(37230678).format('hh:mm:ss.ff')).to.be.equal('10:20:30.68');            
        });

        it ('should format with one place miliseconds', function() {
            expect(timespan(37230678).format('hh:mm:ss.f')).to.be.equal('10:20:30.7');            
        });
        it ('should format with custom format if includes only tenths', function() {
            expect(timespan(37230800).format()).to.be.equal('10:20:30.800');            
        });
    })
});

