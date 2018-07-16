'use strict';

module.exports = {aNew, using};

class WordWrap {

  constructor(adminOptions, options) {
    this.strategies = adminOptions.strategies
    this.options = options;
    this.wrapSize = options.wrapSize||72;
    if(options.wordSplitter === undefined) {
      this.wordSplitter = '-'
    } else {
      this.wordSplitter = options.wordSplitter
    }
    this.lineLength = this.wrapSize - this.wordSplitter.length
  }

  wrap(input) {
    const lineLength = this.lineLength
    var wrapped = ''
    var remainingInput = input
    if (this.strategies) {
      this.strategies[0].fn(input)
    }

    while(remainingInput.length > lineLength){
        //missing strategies:
        //  test through them
        //  make this a rule evaluator
      if(lineHasSpaceAfterCompletingTheLinePastTheMinimumAndNormalSplittingWouldSplitAWord(remainingInput)) {
          const [line, rest] = extractLineWithAMinimumUpToSpace(remainingInput)
          wrapped+=line+'\n'
          remainingInput = rest
          continue
      }
      if(true){
        const line = remainingInput.substring(0,lineLength);
        wrapped += line
        if(lineWouldEndInSpace(remainingInput)){
          wrapped += this.wordSplitter
        }
        wrapped +=  '\n'; 
        remainingInput = remainingInput.substring(lineLength, input.length);
      }
    }
    wrapped = wrapped + remainingInput;
    return {text: wrapped}

    function extractLineWithAMinimumUpToSpace(input) {
      const [firstLine, secondLine] =splitByLastSpace(input)
      return [firstLine,secondLine]
    }

    function lineHasSpaceAfterCompletingTheLinePastTheMinimumAndNormalSplittingWouldSplitAWord (input) {
      return containsSpace(input)
    }

    function lineWouldEndInSpace(candidateLine) {
      return candidateLine.substring(lineLength, lineLength+1)!==' '
    }
      

    function splitByLastSpace(input){
      const values = input.split(/ ([^ ]+)$/)
      return [values[0], values[1]]
    }

    function containsSpace(input){
      return input.includes(' ')
    }
  }
}

function aNew(options) {
  return new WordWrap({}, options);
}

function using(adminOptions) {
  return {
    aNew: options => new WordWrap(adminOptions, options)
  }
}

/**
 * Binds the parameter with the correct `this`
 * @param lambda
 * @returns {function(this:funct)}
 */
function funct(lambda) {
  return lambda.bind(this);
}
