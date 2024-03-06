import { marked } from 'marked'
import { readFileSync, readdirSync } from 'node:fs'

const level = 5

function getWords(wordlist) {
  const listLexer = marked.lexer(wordlist)

  const cleanListLexer = listLexer.filter((l) => l.type !== 'space')
  const listFirstHeading = cleanListLexer.findIndex(
    (l) => l.type === 'heading' && l.depth === 2,
  )
  const cleanerListLexer = cleanListLexer.slice(listFirstHeading)

  const words = []

  while (cleanerListLexer.length > 0) {
    const spellingListObject = {}
    const listNextHeading = cleanerListLexer.shift()
    const weekNumber = listNextHeading?.text.match(/\d+/)[0]
    spellingListObject.week = weekNumber
    const nextDescription = cleanerListLexer.shift()
    spellingListObject.description = nextDescription?.text
    const nextList = cleanerListLexer.shift()
    const listWords = nextList?.items.map((word) => {
      return word.text.trim()
    })
    words.push(...listWords)
  }
  return words
}

function extractWordFromFilename(filename) {
  const index = filename.indexOf('-')
  if (index !== -1) {
    return filename.slice(0, Math.max(0, index))
  }
  const extension = filename.slice(filename.lastIndexOf('.'))
  return filename.slice(0, Math.max(0, filename.lastIndexOf(extension)))
}

export function findMissingAudio(level) {
  const listFile = `src/lib/level${level}-list.md`
  const audioDirectory = 'static/audio/'
  const listMarkdownText = readFileSync(listFile, { encoding: 'utf8' })
  const wordList = getWords(listMarkdownText)
  const audioFiles = new Set(
    readdirSync(audioDirectory).map((filename) =>
      extractWordFromFilename(filename),
    ),
  )
  const missingFiles = wordList.filter((word) => !audioFiles.has(word))
  console.info('Words without audio files:', missingFiles)
  return missingFiles.sort()
}

const words = findMissingAudio(level)
console.info(words.length)
