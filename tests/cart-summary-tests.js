'use strict';

var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');

var CartSummary = require('../src/cart-summary');
var tax = require('../src/tax');


describe ('CartSummary', function() {
    it('getSubtotal() should throw an error, if there is no input array', function () {
        var cartSummary;

        expect(function() {
            cartSummary = new CartSummary();
        }).to.throw(Error);
    });


    it('getSubtotal() should return 0, if there no items', function () {
        var cartSummary = new CartSummary([]);

        expect(cartSummary.getSubTotal()).to.equal(0);
    });

    it('getSubtotal() should return error, if price is empty', function () {
        var cartSummary = new CartSummary([
                {id: 1,
                 quantity: 10
                }
            ]);

        expect(function() {
            cartSummary.getSubTotal();
        }).to.throw(Error);
    });

    it('getSubtotal() should throw an error, if quantity is empty', function () {
        var cartSummary = new CartSummary([
                {id: 1,
                 price: 1
                }
            ]);

        expect(function() {
            cartSummary.getSubTotal();
        }).to.throw(Error);
    });

    it('getSubtotal() should throw an error, if quantity and price is empty', function () {
        var cartSummary = new CartSummary([
                {id: 1
                }
            ]);

        expect(function() {
            cartSummary.getSubTotal();
        }).to.throw(Error);
    });

    it('getSubTotal should throw an error if price is -ve.', function () {
        var cartSummary = new CartSummary([
                {id: 1,
                 quantity: 10,
                 price: -100
                }
            ]);

        expect(function() {
            cartSummary.getSubTotal();
        }).to.throw(Error);
    });

    it('getSubTotal should return 100 for one item of price 10 and quantity 10.', function () {
        var cartSummary = new CartSummary([
                {id: 1,
                 quantity: 10,
                 price: 10
                }
            ]);

        expect(cartSummary.getSubTotal()).to.equal(100);
    });

    it('getSubTotal should return 500 for two items in cart. (5*10), (9*50).', function () {
        var cartSummary = new CartSummary([
                {id: 1, quantity: 5, price: 10},
                {id: 2, quantity: 9, price: 50}
            ]);

        expect(cartSummary.getSubTotal()).to.equal(500);
    });

});

describe('getTax', function() {
    beforeEach(function() {
        sinon.stub(tax, 'calculate').callsFake(function(subtotal, state, done) {
            setTimeout(function() {
                done({
                    amount: 30
                });
            }, 0);
        });
    });

    afterEach(function() {
        tax.calculate.restore();
    });


    it('getTax should execute a callback function with tax amount', function (done) {
        var cartSummary = new CartSummary([
                {id: 1, quantity: 5, price: 10},
                {id: 2, quantity: 9, price: 50}
            ]);

        cartSummary.getTax('NY', function(taxAmount) {
            expect(taxAmount).to.equal(30);
            expect(tax.calculate.getCall(0).args[0]).to.equal(500);
            expect(tax.calculate.getCall(0).args[1]).to.equal('NY');
            done();
        });
    });



});