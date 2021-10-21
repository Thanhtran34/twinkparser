import { Regular } from './Regular.js'
import { Question } from './Question.js'
import { Exclamation } from './Exclamation.js'
export class Sentences {
  constructor(tokens) {
    this.regular = new Regular(tokens)
    this.exclamation = new Exclamation(tokens)
    this.question = new Question(tokens)
    this.regularBuffer = []
    this.exclamationBuffer = []
    this.sentences = []
    this.tokens = tokens
    this.index = 0
    this.pos = 0
  }

  setUpSentence(type, wordsInSentence, sentence) {
    const streamOfWord = {
      type: type,
      wordsInSentence: wordsInSentence,
      sentence: sentence
    }
    return streamOfWord
  }

  setUpRegularSentence() {
    try {
      const regular = this.regular.getAllRegular()
      for (let i = 0; i < regular[0].length; i++) {
        const tree = this.setUpSentence('DOT', regular[0][i].split(/\s/,), regular[0][i])
        this.regularBuffer.push(tree)
      }
      return this.regularBuffer

    } catch (e) {
      throw new SyntaxError('Cannot parse the text. Please begin your document with words or dot!')
    }
  }

  checkForExclamationType() {
    const count = this.exclamation.countSentences()
    if (count !== 0) {
      return true
    } else {
      return false
    }
  }

  checkForQuestionType() {
    const count = this.question.countSentences()
    if (count !== 0) {
      return true
    } else {
      return false
    }
  }

  getSentences() {
    const buff1 = this.setUpRegularSentence()
    this.sentences.push(buff1)
    for (let i = 0; i < buff1.length; i++) {
      this.pos += buff1[i].wordsInSentence.length
    }
    // check for exclamation sentence
    if (this.checkForExclamationType() === true) {
      if (this.pos < this.tokens.length) {
        const buff2 = this.exclamation.getOneExclamationSentence(this.pos)
        const tree = this.setUpSentence('EXCLAMATION', buff2[0].split(/\s/,), buff2.join(' '))
        this.pos += buff2[0].split(/\s/,).length
        this.sentences.push(tree)
      }
    }
    // check for question sentence
    if (this.checkForQuestionType() === true) {
      if (this.pos < this.tokens.length) {
        const buff3 = this.question.getOneQuestionSentence(this.pos)
        const tree = this.setUpSentence('QUESTION', buff3[0].split(/\s/,), buff3.join(' '))
        this.pos += buff3[0].length
        this.sentences.push(tree)
      }
    }
    return this.sentences
  }
}