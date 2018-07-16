"use strict";

class Amount {
  constructor(representation){
    this.value = parseFloat(representation)
  }
  add(otherAmount){
    this.value += otherAmount.value
  }
  formatted(){
    return `${this.value},00`
  }
  negative(){
    this.value = -this.value
  }
}

function EUR(representation){
  return new Amount(representation)
}

module.exports = {EUR}
