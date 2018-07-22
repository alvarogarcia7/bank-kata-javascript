"use strict";

var chai = require('chai')
var sinon = require('sinon')
const expect = chai.expect
var Clock = require('../src/clock')
var Account = require('../src/account')
var Amount = require('../src/amount')
const Operations = require('../src/operations')

describe('Account', () => {
  var clock
  var account

  beforeEach(function () {
    clock = Clock.aNew();
  })

  it('always has a previous balance movement', () => {

    account = Account.aNew(clock, [])

    expect(account.movements.length).to.equals(1)
  });

  it('does not inject a previous balance if it already exists', () => {

    var movements = []
    movements.push(Operations.previousBalance(Amount.EUR("868"), "01/10/2018"))

    account = Account.aNew(clock, movements)
    expect(account.movements.length).to.equals(1)
    console.log(account.movements)
  });
  
});
