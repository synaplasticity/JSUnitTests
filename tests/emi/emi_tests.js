'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var emi = require('../../src/emi/emi-calc');

describe("EMI tests", function() {
    var emiCalc = new emi();

    it ('Should get 24999.00 as the emi value', function() {
        var emiValue = emiCalc.getEmi(500000, 0.05, 120);
        expect(emiValue).to.equal('24999.00');

    });

    it ('Should throw an exception when principal is empty', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(undefined, 0.05, 120);
        }).to.throw(Error);

    });

    it ('Should throw an exception when rate is empty', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(500000, undefined, 120);
        }).to.throw(Error);

    });

    it ('Should throw an exception when duration is empty', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(500000, 0.05, undefined);
        }).to.throw(Error);

    });

    it ('Should throw an exception when principal is negative', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(-500000, 0.05, 120);
        }).to.throw(Error);

    });

    it ('Should throw an exception when rate is negative', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(500000, -0.05, 120);
        }).to.throw(Error);

    });

    it ('Should throw an exception when duration is negative', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(500000, 0.05, -120);
        }).to.throw(Error);

    });

    it ('Should throw an exception when duration is a large unsafe number', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(5000, 0.01, Number.MAX_VALUE);
        }).to.throw(Error);

    });

    it ('Should throw an exception when duration is a less than equal to 0', function() {
        expect(function() {
            var emiValue = emiCalc.getEmi(10000, 0.05, -1);
        }).to.throw(Error);

    });

    it ('Should return Infinity for large unsafe inputs for duration and rate', function() {

        var emiValue = emiCalc.getEmi(Number.MAX_VALUE, Number.MAX_VALUE, 1);
        expect(emiValue).to.equal('Infinity');

    });


});