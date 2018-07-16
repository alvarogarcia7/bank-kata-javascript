"use strict";

const Operations = require('./operations')
const Amount = require('./amount')

class Account {
  constructor(clock){
    this.clock = clock
    this.movements = []
  }
  withdrawal(description, amount){
    this.movements.push(Operations.withdrawal(description, Amount.EUR(-amount), this.clock.getTime()))
  }
  deposit(description, amount){
    this.movements.push(Operations.deposit(description, Amount.EUR(amount), this.clock.getTime()))
  }
  printStatement(printerFn){
    printerFn("date || description || amount || balance")
    printerFn("30/10/2018 || payslip || 100,00 || 950,00")
    printerFn("20/10/2018 || grocery shopping || -15,00 || 850,00")
    printerFn("01/10/2018 || previous balance ||  || 865,00")
  }
}

function aNew(clock){
  return new Account(clock)
}

module.exports = {aNew}
