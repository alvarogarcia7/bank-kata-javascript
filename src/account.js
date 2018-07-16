"use strict";

const Operations = require('./operations')

class Account {
  constructor(clock){
    this.clock = clock
    this.movements = []
  }
  withdrawal(description, amount){
    this.movements.push(Operations.withdrawal(description, amount, this.clock.getTime()))
  }
  deposit(description, amount){

  }
  printStatement(printer){
    printer("date || description || amount || balance")
    printer("30/10/2018 || payslip || 100,00 || 950,00")
    printer("20/10/2018 || grocery shopping || -15,00 || 850,00")
    printer("01/10/2018 || previous balance ||  || 865,00")
  }
}

function aNew(clock){
  return new Account(clock)
}

module.exports = {aNew}
