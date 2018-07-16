"use strict";

class Operation{
  constructor(description, amount, time){
    this.description = description
    this.amount = amount
    this.time = time
  }
}

function withdrawal(description, amount, time){
  return new Operation(description, amount, time)
}

module.exports = {withdrawal}