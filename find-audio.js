import { copyFileSync, readFileSync, existsSync } from 'node:fs'
import path, { join, dirname, relative } from 'node:path'
import { globSync } from 'glob'
import { marked } from 'marked'

const level = 5
const listFile = `src/lib/level${level}-list.md`

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

function compareWordsWithFiles(sourceDirectory, wordList) {
  const wordFiles = {}
  const noFileWords = []

  for (const word of wordList) {
    console.info(word)
    const wordDirectory = join(sourceDirectory, '**', `${word}.ogg`)
    const matchingFiles = globSync(wordDirectory, { nodir: true })
    if (matchingFiles.length === 0) {
      noFileWords.push(word)
    } else {
      wordFiles[word] = matchingFiles
    }
  }

  return { wordFiles, noFileWords }
}

function copyWordFilesToStatic(
  wordFiles,
  sourceDirectory,
  destinationDirectory,
) {
  for (const word in wordFiles) {
    const files = wordFiles[word]
    for (const file of files) {
      console.info(file)
      const sourceSubdirectory = dirname(relative(sourceDirectory, file))
      const suffix = sourceSubdirectory
        // .substring(0, 4)
        .toLowerCase()
        .replaceAll(/\s/g, '')
      const restrictedCharacterSet = /[^\w-]/g // Restricting to alphanumeric, underscore, and hyphen
      const restrictedSuffix = suffix
        .normalize('NFKD')
        .replaceAll(restrictedCharacterSet, '')
      const fileName = path.basename(file, path.extname(file))
      const newFileName = `${fileName}-${restrictedSuffix}${path.extname(file)}`
      const destinationPath = path.join(destinationDirectory, newFileName)
      if (existsSync(destinationPath)) {
        console.info(
          `Destination file ${destinationPath} already exists. Skipping.`,
        )
      } else {
        copyFileSync(file, destinationPath)
        console.info(`Copied ${newFileName}`)
      }
    }
  }
}

const listMarkdownText = readFileSync(listFile, { encoding: 'utf8' })
const wordList = getWords(listMarkdownText)
console.info('Total words:', wordList.length)
const sourceDirectory =
  '/home/james/Downloads/mnt/datasets/raw/Q22-eng-English/'
const destinationDirectory = 'static/audio/'
const { wordFiles, noFileWords } = compareWordsWithFiles(
  sourceDirectory,
  wordList,
)
copyWordFilesToStatic(wordFiles, sourceDirectory, destinationDirectory)

console.info('Words without files:', noFileWords)
