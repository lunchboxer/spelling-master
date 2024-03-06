import fs from 'node:fs'

const wordList = JSON.parse(
  fs.readFileSync('./src/lib/words-by-week.json', 'utf8'),
)

const folderName = './static/audio'
const indexFile = './src/lib/audio-index.json'

// filenames are in format of 'word-author.extension'
// `word.extension` is also possible
function getWordFromFilename(filename) {
  if (filename.includes('-')) {
    return filename.split('-')[0]
  }
  return filename.split('.')[0]
}
function generateIndex(wordsList, folderName, indexName) {
  const audioIndex = []
  if (!fs.existsSync(folderName)) {
    console.info('directory does not exist')
    fs.mkdirSync(folderName)
  }
  const files = fs.readdirSync(folderName)
  const filesGroupedByWord = {}
  for (const file of files) {
    const word = getWordFromFilename(file)
    filesGroupedByWord[word] = filesGroupedByWord[word] || []
    filesGroupedByWord[word].push(file)
  }
  for (const level in wordsList) {
    audioIndex[level] = {}
    for (const week of Object.keys(wordsList[level])) {
      const list = wordsList[level][week].list
      const weekFiles = list.map(word => filesGroupedByWord[word])
      audioIndex[level][week] = weekFiles
    }
  }
  fs.writeFileSync(indexName, JSON.stringify(audioIndex), 'utf8')
}

generateIndex(wordList, folderName, indexFile)
