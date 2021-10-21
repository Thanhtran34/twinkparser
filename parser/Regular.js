export class Regular {
  constructor(tokens) {
    this.tokens = tokens
    this.count = 0
    this.regular = []
    this.regularPackage = []
    this.index = 0
  }

  getAllRegular() {
    try {
      const count = this.countSentences()
      let i = 0
      let sentence
      while (i < count) {
        sentence = this.getOneRegularSentence(this.index)
        i++
      }
      this.regularPackage.push(sentence)
      return this.regularPackage
    } catch (e) {
      // error when input is not word and dot.
      throw new SyntaxError('There has more than words and dot in this document!')
    }
  }

  countSentences() {
    this.tokens.forEach(token => {
      if (token.type.toUpperCase() === 'DOT') {
        this.count++
      }
    })
    return this.count
  }

  getOneRegularSentence(index) {
    try {
      let regular = []
      while (this.tokens[index].type.toUpperCase() !== 'DOT') {
        if (this.tokens[index].type.toUpperCase() === 'WORD') {
          regular.push(this.tokens[index].value)
          index++
        }
      } if (this.tokens[index].type.toUpperCase() === 'DOT') {
        regular.push(this.tokens[index].value)
        index++
      }
      this.index = index
      this.regular.push(regular.join(' '))
      return this.regular
    } catch (e) {
      throw new SyntaxError('Cannot parse the text!')
    }
  }
}