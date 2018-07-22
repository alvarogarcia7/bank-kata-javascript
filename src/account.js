"use strict";

const Operations = require('./operations')
const Amount = require('./amount')

class Account {
  constructor(clock, movements){
    this.clock = clock
    if(movements.length > 0){
      this.movements = movements
    } else {
      this.movements = []
      this.movements.push(Operations.previousBalance(Amount.EUR("865"), "01/10/2018"))
    }
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
    
    var currentBalance = Operations.previousBalance(Amount.EUR("0"), "")
    movements
      .map((row,i) => {
        currentBalance.cumulate(row.amount)
        row.balance = currentBalance.amountFormatted()
        row.hideAmount = i === 0
        return row
      })
      .map (row => {
        return row
      })
      .reverse()
      .map(row => {
        printerFn(`${row.timeFormatted()} || ${row.descriptionFormatted()} || ${row.hideAmount ? "" : row.amountFormatted()} || ${row.balance}`)
      })
  }

  statementHeader(){
    return "date || description || amount || balance"
  }
}

function aNew(clock, movements){
  return new Account(clock, movements)
}

module.exports = {aNew}
