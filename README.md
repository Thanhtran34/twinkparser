# Welcome to Twink Parser js

This project is developed based on my twink-tokenizer-js-tt package [npm](https://www.npmjs.com/package/twink-tokenizer-js-tt). 
After Lexical Analys we will come to Syntax Analys to get Abstract Syntax Tree - AST. This parser will make AST based on Word and 
Dot token type. Twink Parser can group all words and dot and give you back sentences of one text document. 

## Installation
- Use [npm](https://www.npmjs.com/package/twink-tokenizer-js-tt) to install twink-tokenizer-js-tt:
npm i twink-tokenizer-js-tt

- Use [npm](https://www.npmjs.com/package/twink-parserjs) to install twink-parserjs:
npm i twink-parserjs

- Come to github and clone this project and try it yourself
https://github.com/Thanhtran34/Twink-Tokenizerjs


## Getting Started

[Original Text](./public/img/original.PNG)

```
import { Tokenizer, TokenTyper, Grammar } from 'twink-tokenizer-js-tt'
import { Document } from 'twink-parserjs'

const fileName = 'demo.text' // path to your text file
const fileData = fs.readFileSync(fileName, 'utf8')
const tokenizer  = new Tokenizer('WORDANDDOTGRAMMAR', fileData)
tokenizer.setRule(new TokenTyper('WORD', '^[a-zA-Z|äöåÄÖÅ]+$'))
tokenizer.setRule(new TokenTyper('DOT', '^\\.$'))
tokenizer.setRule(new TokenTyper('EXCLAMATION', '^!$'))
tokenizer.setRule(new TokenTyper('QUESTION', '^[?]$'))
const tokens = tokenizer.runTokenizer()

const document = new Document(tokens)
const sentences = document.getSentences()
console.log(sentences)

// Result for AST
[
  [
    {
      type: 'DOT',
      wordsInSentence: ['My', 'name','is', 'Jen', '.']
      sentence: 'My name is Jen.'
    },
    {
      type: 'DOT',
      wordsInSentence: ['It','is', 'Friday', '.']
      sentence: 'It is Friday .'
    },
    {
      type: 'DOT',
      wordsInSentence: ['My', 'farther', 'will', 'come', 'back', 'after', 'his', 'trip', 'to', 'Greece', '.']
      sentence: 'My farther will come back after his trip to Greece .'
    }
  ], 
  {
      type: 'EXCLAMATION',
      wordsInSentence: ['Happy', 'weekend', '!']
      sentence: 'happy weekend !'
  },
  {
      type: 'QUESTION',
      wordsInSentence: ['How', 'about', 'you', '?']
      sentence: 'How about you ?'
  },
]

```

### About Twink-parser
This small project is used for learning about Syntax analys and it support my twink-tokenizer-js-tt to do more thing only lexer words with regex. It still needs to improve more so if you have interest just help me to make it become better tool. 

### Copyright & License
It is licensed under the terms of the MIT License. You are free to use it so give it a try.