import { Sentences } from './parser/Sentences.js'
import { Exclamation } from './parser/Exclamation.js'
import { Question } from './parser/Question.js'

export class Document extends Sentences {
  constructor(tokens) {
    super(tokens)
    this.type = {}
    this.doc = []
    this.exclamation = new Exclamation(tokens)
    this.exBuffer = []
    this.questionBuffer = []
    this.question = new Question(tokens)
  }

  setUpTypeOfSentence(name, list) {
    this.type = {
      type: name,
      list: JSON.stringify(list)
    }
    return this.type
  }

  getAndSortSentences() {
    const streamSentences = this.getSentences()
    const buff1 = this.setUpTypeOfSentence('REGULAR', streamSentences[0])
    this.doc.push(buff1)
    const buff2 = this.setUpTypeOfSentence('EXCLAMATION', streamSentences[1])
    this.doc.push(buff2)
    const buff3 = this.setUpTypeOfSentence('QUESTION', streamSentences[2])
    this.doc.push(buff3)
    return this.doc
  }

  getAllRegularSentences() {
    return this.setUpRegularSentence()
  }

  getAllExclamationSentences() {
    const exclamation = this.exclamation.getAllExclamation()
    for (let i = 0; i < exclamation[0].length; i++) {
      const tree = this.setUpSentence('EXCLAMATION', exclamation[0][i].split(/\s/,), exclamation[0][i])
      this.exBuffer.push(tree)
    }
    return this.exBuffer
  }

  getAllQuestionSentences() {
    const question = this.question.getAllQuestion()
    for (let i = 0; i < question[0].length; i++) {
      const tree = this.setUpSentence('QUESTION', question[0][i].split(/\s/,), question[0][i])
      this.questionBuffer.push(tree)
    }
    return this.questionBuffer
  }
}