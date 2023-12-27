import { marked } from 'marked'

import wordList1 from '$lib/level1-list.md?raw'
import wordList2 from '$lib/level2-list.md?raw'
import wordList3 from '$lib/level3-list.md?raw'
import wordList4 from '$lib/level4-list.md?raw'
import wordList5 from '$lib/level5-list.md?raw'

import glossary1 from '$lib/level1-glossary.md?raw'
import glossary2 from '$lib/level2-glossary.md?raw'
import glossary3 from '$lib/level3-glossary.md?raw'
import glossary4 from '$lib/level4-glossary.md?raw'
import glossary5 from '$lib/level5-glossary.md?raw'

export const prerender = true

/**
 * @param {string} wordlist - markdown file with master word list
 */
function getWords(wordlist) {
  const listLexer = marked.lexer(wordlist)

  const cleanListLexer = listLexer.filter((l) => l.type !== 'space')
  const listFirstHeading = cleanListLexer.findIndex(
    (l) => l.type === 'heading' && l.depth === 2,
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
    spellingListObject.list = nextList?.items.map((w) => w.text.trim())
    spellingLists[weekNumber] = spellingListObject
  }
  return spellingLists
}

// make a javascript object out of the glossary file in markdown definition list form
function parseGlossary(glossary) {
  const glossaryObject = {}
  const glossaryItems = marked
    .lexer(glossary)
    .filter((l) => l.type !== 'space' && l.type !== 'heading')
  for (const term of glossaryItems) {
    const splitDefinition = term.text.split('\n')
    // the definitions can contain single quotes or appostrophes which need to be escaped
    glossaryObject[splitDefinition[0].trim()] = splitDefinition[1]
      .slice(2)
      .trim()
  }
  return glossaryObject
}
/** @type {import('./$types').LayoutLoad} */
export function load() {
  const lists = []
  const glossaries = []
  lists[0] = getWords(wordList1)
  lists[1] = getWords(wordList2)
  lists[2] = getWords(wordList3)
  lists[3] = getWords(wordList4)
  lists[4] = getWords(wordList5)
  glossaries[0] = parseGlossary(glossary1)
  glossaries[1] = parseGlossary(glossary2)
  glossaries[2] = parseGlossary(glossary3)
  glossaries[3] = parseGlossary(glossary4)
  glossaries[4] = parseGlossary(glossary5)

  return {
    lists,
    glossaries,
  }
}
