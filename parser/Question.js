export class Question {
  constructor(tokens) {
    this.tokens = tokens
    this.count = 0
    this.question = []
    this.questionPackage = []
    this.index = 0
  }

  getAllQuestion() {
    try {
      const count = this.countSentences()
      let i = 0
      let sentence
      while (i < count) {
        sentence = this.getOneQuestionSentence(this.index)
        i++
      }
      this.questionPackage.push(sentence)
      return this.questionPackage
    } catch (e) {
      // error if input is not word and question mark.
      throw new SyntaxError('There has more than words and questions in this document!')
    }
  }

  countSentences() {
    this.tokens.forEach(token => {
      if (token.type.toUpperCase() === 'QUESTION') {
        this.count++
      }
    })
    return this.count
  }

  getOneQuestionSentence(index) {
    try {
      let question = []
      while (this.tokens[index].type.toUpperCase() !== 'QUESTION') {
        if (this.tokens[index].type.toUpperCase() === 'WORD') {
          question.push(this.tokens[index].value)
          index++
        }
      } if (this.tokens[index].type.toUpperCase() === 'QUESTION') {
        question.push(this.tokens[index].value)
        index++
      }
      this.index = index
      this.question.push(question.join(' '))
      return this.question
    } catch (e) {
      throw new SyntaxError('Cannot parse the text!')
    }
  }
}