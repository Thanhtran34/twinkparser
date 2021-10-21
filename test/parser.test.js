import pkg from 'mocha'
import chai from 'chai'
import { Tokenizer, TokenTyper, Grammar } from 'twink-tokenizer-js-tt'
import { Sentences } from '../Sentences.js'
import { Document } from '../Document.js'
import * as fs from 'fs'

const expect = chai.expect
const { describe, it } = pkg

describe('WORDANDDOTGRAMMAR', () => {
  it('Hittar varje mening', () => {
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', 'a.b.')
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const sentences = new Sentences(tokens)
    const result = sentences.getSentences()
    const expected = [[{type: 'DOT', wordsInSentence: ['a', '.'], sentence: 'a .'}, {type: 'DOT', wordsInSentence: ['b', '.'], sentence: 'b .'}]]
    expect(result).to.deep.equal(expected)
  })

  it('Meningen är ett uttrop', () => {
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', 'Hej John Smith!')
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const doc = new Document(tokens)
    const result = doc.getAllExclamationSentences()
    const expected = [{type: 'EXCLAMATION', wordsInSentence: ['Hej', 'John', 'Smith', '!'], sentence: 'Hej John Smith !'}]
    expect(result).to.deep.equal(expected)
  })

  it('Meningen är en fråga', () => {
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', 'How are you today?')
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const doc = new Document(tokens)
    const result = doc.getAllQuestionSentences()
    const expected = [{type: 'QUESTION', wordsInSentence: ['How', 'are', 'you', 'today', '?'], sentence: 'How are you today ?'}]
    expect(result).to.deep.equal(expected)
  })

  it('Senare ord har rätt bokstäver', () => {
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', 'a bc.')
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const doc = new Document(tokens)
    const sentence = doc.getAllRegularSentences()
    const result = sentence[0].wordsInSentence[1]
    const expected = 'bc'
    expect(result).to.deep.equal(expected)
  })

  it('Hittar alla olika meningar', () => {
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', 'My name is Jen. This is Friday. Happy weekend! How about you?')
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const sentences = new Sentences(tokens)
    const result = sentences.getSentences()
    const expected = [[{type: 'DOT', wordsInSentence: ['My', 'name', 'is', 'Jen', '.'], sentence: 'My name is Jen .'}, {type: 'DOT', wordsInSentence: ['This', 'is', 'Friday', '.'], sentence: 'This is Friday .'}], {type: 'EXCLAMATION', wordsInSentence: ['Happy', 'weekend', '!'], sentence: 'Happy weekend !'}, {type: 'QUESTION', wordsInSentence: ['How', 'about', 'you', '?'], sentence: 'How about you ?'}]
    expect(result).to.deep.equal(expected)
  })

  it('Hittar alla olika meningar från en text fil', () => {
    const fileName = '../Parser/demo.txt'
    const fileData = fs.readFileSync(fileName, 'utf8')
    const tokenizer = new Tokenizer('WORDANDDOTGRAMMAR', fileData)
    tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
    tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
    tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
    tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
    const tokens = tokenizer.runTokenizer()
    const sentences = new Sentences(tokens)
    const result = sentences.getSentences()
    const expected = [[{ type: 'DOT', wordsInSentence: ['My', 'name', 'is', 'Jen', '.'], sentence: 'My name is Jen .' }, { type: 'DOT', wordsInSentence: ['This', 'is', 'Friday', '.'], sentence: 'This is Friday .' }], { type: 'EXCLAMATION', wordsInSentence: ['Happy', 'weekend', '!'], sentence: 'Happy weekend !' }, { type: 'QUESTION', wordsInSentence: ['How', 'about', 'you', '?'], sentence: 'How about you ?' }]
    expect(result).to.deep.equal(expected)
  })
})




