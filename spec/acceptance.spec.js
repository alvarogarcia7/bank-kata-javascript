"use strict";

var chai = require('chai')
var sinon = require('sinon')
const expect = chai.expect
var Clock = require('../src/clock')
var Account = require('../src/account')
var Amount = require('../src/amount')

describe('Bank kata', () => {
    describe('acceptance test', ()=> {
      var clock;
      var lines

      beforeEach(function () {
        clock = Clock.aNew();
        lines = []
      })

      it('produces a statement after a few operations', () => {
        sinon.stub(clock, 'getTime').returns("30/10/2018", "20/10/2018");
        var account = Account.aNew(clock)

        account.withdrawal("payslip", Amount.EUR("100"))
        account.deposit("grocery shopping", Amount.EUR("15"))
        account.printStatement(line=>{lines.push(line)})

        expect(lines).to.deep.equals([
          "date || description || amount || balance",
          "30/10/2018 || payslip || 100,00 || 950,00",
          "20/10/2018 || grocery shopping || -15,00 || 850,00",
          "01/10/2018 || previous balance ||  || 865,00",
          ])
      });
      
    });
});
