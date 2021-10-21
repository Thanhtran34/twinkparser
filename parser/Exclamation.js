export class Exclamation {
  constructor(tokens) {
    this.tokens = tokens
    this.exclamation = []
    this.exclamationPackage = []
    this.count = 0
    this.index = 0
  }

  getAllExclamation() {
    try {
      const count = this.countSentences()
      let i = 0
      let sentence
      while (i < count) {
        sentence = this.getOneExclamationSentence(this.index)
        i++
      }
      this.exclamationPackage.push(sentence)
      return this.exclamationPackage
    } catch (e) {
      // error when input is not word and exclamation
      throw new SyntaxError('There has more than words and exclamation in this document!')
    }
  }

  countSentences() {
    this.tokens.forEach(token => {
      if (token.type.toUpperCase() === 'EXCLAMATION') {
        this.count++
      }
    })
    return this.count
  }

  getOneExclamationSentence(index) {
    try {
      let exclamation = []
      while (this.tokens[index].type.toUpperCase() !== 'EXCLAMATION') {
        if (this.tokens[index].type.toUpperCase() === 'WORD') {
          exclamation.push(this.tokens[index].value)
          index++
        }
      } if (this.tokens[index].type.toUpperCase() === 'EXCLAMATION') {
        exclamation.push(this.tokens[index].value)
        index++
      }
      this.index = index
      this.exclamation.push(exclamation.join(' '))
      return this.exclamation
    } catch (e) {
      throw new SyntaxError('cannot parse the text')
    }
  }
}