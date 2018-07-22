"use strict";

var chai = require('chai')
var sinon = require('sinon')
const expect = chai.expect
var Clock = require('../src/clock')
var Account = require('../src/account')
var Amount = require('../src/amount')

describe('formatter', ()=> {
  var clock;
  var lines
  var account

  beforeEach(function () {
    clock = Clock.aNew();
    lines = []
    account = Account.aNew(clock, [])
  })

  it('prints the header', () => {

    account.printStatement(line=>{lines.push(line)})

    expect([lines[0]]).to.deep.equals([
      "date || description || amount || balance"
      ])
  });

  it('even without movements, there is a previous balance line', () => {

    account.printStatement(line=>{lines.push(line)})

    expect([lines[1]]).to.deep.equals([
      "01/10/2018 || previous balance ||  || 865,00"
      ])
  });
  
});
