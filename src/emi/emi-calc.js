'use strict';

function EmiCalc() {

}

    EmiCalc.prototype.getEmi = function(principal, rate, duration) {
        var emi = ( principal * rate * (Math.pow(rate+1, duration)) )
                            / Math.pow(rate+1, duration)-1;

        console.log(emi);

        return emi.toFixed(2);
    };

module.exports = EmiCalc;
