// import 'dotenv/config'
import { writeFileSync } from 'node:fs'
import { findMissingAudio } from './find-missing-audio'
const models = [
  'eleven_multilingual_v2', // 0
  'eleven_multilingual_v1', // 1
  'eleven_monolingual_v1', // 2
  'eleven_multilingual_sts_v2', // 3
  'eleven_turbo_v2', // 4
  'eleven_english_sts_v2', // 5
]

const modelId = models[4]
// const charlie = 'IKne3meq5aSn9XLyUdCD'
// const rachel = '21m00Tcm4TlvDq8ikWAM' // American
const brian = 'nPczCjzI2devNBz1zQrb' // American - turbov2
// const chris = 'iP95p4xoKVk53GoZ742B' // American - turbov2
// const sally = 'kWBoP3jUS89IKgUdvEjR' // American
// const gemma = 'uW6kj50m7SR3Qhc12sJw' // slow, American
const voice_id = brian
const destination = 'static/audio/00Generated'

const level = 5

let fetched = 0

const api = 'https://api.elevenlabs.io/v1'
const ttsUrl = `${api}/text-to-speech/${voice_id}`
const userUrl = `${api}/user/subscription`

const fetchAudio = async (text) => {
  fetched = 1
  const data = {
    text: `${text}`,
    model_id: modelId,
    voice_settings: {
      stability: 0.75,
      similarity_boost: 1,
    },
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
    },
    body: JSON.stringify(data),
  }
  return await fetch(ttsUrl, options)
}

const getSubscriptionInfo = async () => {
  const response = await fetch(userUrl, {
    method: 'GET',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
    },
  })
  const { character_count, character_limit, next_character_count_reset_unix } =
    await response.json()
  const charactersLeft = character_limit - character_count
  const nextCharacterCountReset = new Date(
    next_character_count_reset_unix * 1000,
  )
  return { charactersLeft, nextCharacterCountReset }
}

const { charactersLeft: charactersLeftStart } = await getSubscriptionInfo()
console.info(`You have ${charactersLeftStart} characters left\n`)

try {
  const wordsList = findMissingAudio(level)
  if (!wordsList?.length) {
    throw new Error(`No words found needing audio for level ${level}.`)
  }
  console.info('Words needing audio:', wordsList.length)
  const totalCharacters = wordsList.reduce(
    (total, currentString) => total + currentString.length,
    0,
  )
  console.info('Total characters:', totalCharacters)
  console.info('Downloading audio...\n')
  for (const word in wordsList) {
    const text = wordsList[word]
    const response = await fetchAudio(text)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    writeFileSync(`${destination}/${text}.mp3`, buffer)
    console.info('Audio file written to:', `${destination}/${text}.mp3`)
  }
} catch (error) {
  console.error(error)
}

const { charactersLeft, nextCharacterCountReset } = await getSubscriptionInfo()
console.info('')
if (fetched) {
  console.info(`Used ${charactersLeftStart - charactersLeft} characters`)
  console.info(`You have ${charactersLeft} characters left`)
}
console.info(`Quota resets ${nextCharacterCountReset}`)
