'use strict';

var tax = require('../src/tax');

function CartSummary(items) {
    this._items = items;
}

    CartSummary.prototype.getSubTotal = function() {

        if (this._items.length) {
            return this._items.reduce(function(subtotal, item) {
                if (item.price === undefined || item.quantity === undefined) {
                    throw Error("Price or quantity cannot be empty for item - "  + item.id);
                }

                return subtotal += (item.price * item.quantity);
            }, 0);
        }

        return 0;
    };


    CartSummary.prototype.getTax = function(state, done) {
        tax.calculate(this.getSubTotal(), state, function (taxInfo) {
            done(taxInfo.amount);
        });
    };

module.exports = CartSummary;