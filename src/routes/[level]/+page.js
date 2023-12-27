import { marked } from 'marked'
import { error } from '@sveltejs/kit'

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

/**
 * @param {string} wordlist - markdown file with master word list
 */
function getWholeLevelWords(wordlist) {
  const listLexer = marked.lexer(wordlist)

  const cleanListLexer = listLexer.filter((l) => l.type !== 'space')
  const listFirstHeading = cleanListLexer.findIndex(
    (l) => l.type === 'heading' && l.depth === 2,
  )
  const cleanerListLexer = cleanListLexer.slice(listFirstHeading)

  const spellingLists = []

  while (cleanerListLexer.length > 0) {
    cleanerListLexer.shift() // Week number heading
    cleanerListLexer.shift() // Week list description
    const nextList = cleanerListLexer.shift()
    spellingLists.push(...nextList?.items.map((w) => w.text.trim()))
  }
  return spellingLists.sort((a, b) => a.localeCompare(b))
}

/**
 * @param {string} glossary - markdown file with glossary
 */
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

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (!(params.level >= 1 && params.level <= 5)) {
    throw error(404, 'Not found')
  }
  let list = []
  switch (params.level) {
    case '1': {
      list = getWholeLevelWords(wordList1)
      break
    }
    case '2': {
      list = getWholeLevelWords(wordList2)
      break
    }
    case '3': {
      list = getWholeLevelWords(wordList3)
      break
    }
    case '4': {
      list = getWholeLevelWords(wordList4)
      break
    }
    case '5': {
      list = getWholeLevelWords(wordList5)
      break
    }
  }

  let glossary
  switch (params.level) {
    case '1': {
      glossary = parseGlossary(glossary1)
      break
    }
    case '2': {
      glossary = parseGlossary(glossary2)
      break
    }
    case '3': {
      glossary = parseGlossary(glossary3)
      break
    }
    case '4': {
      glossary = parseGlossary(glossary4)
      break
    }
    case '5': {
      glossary = parseGlossary(glossary5)
      break
    }
  }

  return {
    list,
    glossary,
    week: params.week,
    level: params.level,
  }
}
