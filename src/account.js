"use strict";

const Operations = require('./operations')
const Amount = require('./amount')

class Account {
  constructor(clock){
    this.clock = clock
    this.movements = []
  }
  withdrawal(description, amount){
    amount.negative()
    this.movements.push(Operations.withdrawal(description, amount, this.clock.getTime()))
  }
  deposit(description, amount){
    var date = this.clock.getTime()
    this.movements.push(Operations.deposit(description, amount, date))
  }
  printStatement(printerFn){
    printerFn(this.statementHeader())
    var movements = [...this.movements]
    
    var currentBalance = this.previousBalance()
    movements
      .map(row => {
        currentBalance.cumulate(row.amount)
        row.balance = currentBalance.amountFormatted()
        return row
      })
      .map (row => {
        return row
      })
      .reverse()
      .map(row => {
        printerFn(`${row.timeFormatted()} || ${row.descriptionFormatted()} || ${row.amountFormatted()} || ${row.balance}`)
      })
      printerFn(`${this.previousBalance().timeFormatted()} || ${this.previousBalance().descriptionFormatted()} ||  || ${this.previousBalance().amountFormatted()}`)
  }

  statementHeader(){
    return "date || description || amount || balance"
  }
  previousBalance(){
    const result = Operations.previousBalance(Amount.EUR("865"), "01/10/2018")
    return result
  }
}

function aNew(clock){
  return new Account(clock)
}

module.exports = {aNew}
