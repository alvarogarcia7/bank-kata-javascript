"use strict";

class Operation{
  constructor(description, amount, time){
    this.description = description
    this.amount = amount
    this.time = time
  }
  cumulate(otherAmount){
//    console.log(this)
//    console.log(otherAmount)
    this.amount.add(otherAmount)
  }
  amountFormatted(){
    return this.amount.formatted()
  }
  descriptionFormatted(){
    return this.description
  }
  timeFormatted(){
    return this.time
  }
}

function withdrawal(description, amount, time){
  return new Operation(description, amount, time)
}

function deposit(description, amount, time){
  return new Operation(description, amount, time)
}

function previousBalance(amount, time){
  return new Operation("previous balance", amount, time)
}

module.exports = {withdrawal, deposit, previousBalance}