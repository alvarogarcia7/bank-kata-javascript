"use strict";

var chai = require('chai');
var sinon = require('sinon');

const wordWrap = require('./../src/prod');

describe('Bank kata', () => {
    describe('acceptance test', ()=> {
      var clock;

      beforeEach(function () {
        clock = Clock(
          { getTime: function () { return {} } });
      });

      it('produces a statement after a few operations', () => {
        sinon.stub(clock, 'getTime').returns("30/10/2018", "20/10/2018");
        var account = new Account(clock)

        account.withdrawal("payslip", new Amount("100"))
        account.deposit("grocery shopping", new Amount("15"))
        account.printStatement(line=>{lines.push(line)})

        expect(lines).to.equal([
          "date || description || amount || balance",
          "30/10/2018 || payslip || 100,00 || 950,00",
          "20/10/2018 || grocery shopping || -15,00 || 850,00",
          "01/10/2018 || previous balance ||  || 865,00",
          ])
      });
      
    });
});
