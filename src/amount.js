"use strict";

class Amount {
  constructor(representation){
    this.value = parseFloat(representation)
  }
}

function EUR(representation){
  return new Amount(representation)
}

module.exports = {EUR}
