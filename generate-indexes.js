import fs from 'node:fs'
import { marked } from 'marked'

const wordList = []
for (const i in [0, 1, 2, 3, 4]) {
  wordList[i] = fs.readFileSync(
    `./src/lib/level${Number(i) + 1}-list.md`,
    'utf8',
  )
}

const glossariesMarkdown = []
for (const i in [0, 1, 2, 3, 4]) {
  glossariesMarkdown[i] = fs.readFileSync(
    `./src/lib/level${Number(i) + 1}-glossary.md`,
    'utf8',
  )
}

function parseGlossary(glossary) {
  const glossaryObject = {}
  const glossaryItems = marked
    .lexer(glossary)
    .filter(l => l.type !== 'space' && l.type !== 'heading')
  for (const term of glossaryItems) {
    const splitDefinition = term.text.split('\n')
    const definition = splitDefinition[1].slice(2).trim()
    const cleanTerm = splitDefinition[0].trim()
    glossaryObject[cleanTerm] = definition
  }
  return glossaryObject
}

function getWords(wordlist) {
  const listLexer = marked.lexer(wordlist)

  const cleanListLexer = listLexer.filter(l => l.type !== 'space')
  const listFirstHeading = cleanListLexer.findIndex(
    l => l.type === 'heading' && l.depth === 2,
  )
  const cleanerListLexer = cleanListLexer.slice(listFirstHeading)

  const spellingLists = {}

  while (cleanerListLexer.length > 0) {
    const spellingListObject = {}
    const listNextHeading = cleanerListLexer.shift()
    const weekNumber = listNextHeading?.text.match(/\d+/)[0]
    spellingListObject.week = weekNumber
    const nextDescription = cleanerListLexer.shift()
    spellingListObject.description = nextDescription?.text
    const nextList = cleanerListLexer.shift()
    spellingListObject.list = nextList?.items.map(word => {
      return word.text.trim()
    })
    spellingLists[weekNumber] = spellingListObject
  }
  return spellingLists
}

function getAllTheWords(wordlists) {
  const allTheWords = []
  for (const wordlist of wordlists) {
    const listLexer = marked.lexer(wordlist)

    const cleanListLexer = listLexer.filter(l => l.type !== 'space')
    const listFirstHeading = cleanListLexer.findIndex(
      l => l.type === 'heading' && l.depth === 2,
    )
    const cleanerListLexer = cleanListLexer.slice(listFirstHeading)

    const spellingLists = []

    while (cleanerListLexer.length > 0) {
      cleanerListLexer.shift() // Week number heading
      cleanerListLexer.shift() // Week list description
      const nextList = cleanerListLexer.shift()
      const listWords = nextList?.items.map(word => word.text.trim())
      spellingLists.push(...listWords)
    }
    allTheWords.push(spellingLists.sort((a, b) => a.localeCompare(b)))
  }
  return allTheWords
}

const lists = []
for (const i in [0, 1, 2, 3, 4]) {
  lists[i] = getWords(wordList[i])
}

fs.writeFileSync('./src/lib/words-by-week.json', JSON.stringify(lists))

fs.writeFileSync(
  './src/lib/words-all.json',
  JSON.stringify(getAllTheWords(wordList)),
)

const glossaries = []
for (const i in [0, 1, 2, 3, 4]) {
  glossaries[i] = parseGlossary(glossariesMarkdown[i])
}

fs.writeFileSync('./src/lib/glossaries.json', JSON.stringify(glossaries))
