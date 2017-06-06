'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var emi = require('../../src/emi/emi-calc');

describe("EMI tests", function() {
    var emiCalc = new emi();

    it ('Should get 24999 as the emi value', function() {

        var emiValue = emiCalc.getEmi(500000, 0.05, 120);

        expect(emiValue).to.equal('24999.00');

    })

});