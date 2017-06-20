'use strict';

function EmiCalc() {

}

    EmiCalc.prototype.getEmi = function(principal, rate, duration) {

        if (principal === undefined || principal === NaN) {
            throw Error('Principal cannot be empty.');
        }
        if (rate === undefined || rate === NaN) {
            throw Error('Rate cannot be empty.');
        }
        if (duration === undefined || duration === NaN) {
            throw Error('Duration cannot be empty.');
        }
        if (Math.sign(principal) === -1 || Math.sign(rate) === -1 || Math.sign(duration) === -1) {
            throw Error("Values cannot be negative.");
        }
        if (duration > Number.MAX_SAFE_INTEGER) {
            throw Error("Duration cannot be larger than Number.MAX_SAFE_INTEGER.");
        }
        if (duration <= 0) {
            throw Error("Duration cannot be zero or negative.");
        }

        var emi = ( principal * rate * (Math.pow(rate+1, duration)) )
                            / Math.pow(rate+1, duration)-1;

        console.log(emi);

        return emi.toFixed(2);
    };

module.exports = EmiCalc;
