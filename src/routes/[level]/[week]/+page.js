import glossaries from '$lib/glossaries.json'
import wordLists from '$lib/words-by-week.json'
import audioIndex from '$lib/audio-index.json'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const { level, week } = params
  if (!(level >= 1 && level <= 5)) {
    throw error(404, 'Not found')
  }
  if (!(week >= 1 && week <= 36)) {
    throw error(404, 'Not found')
  }
  const levellist = wordLists[level - 1]
  const weekList = levellist[week - 1]
  const glossary = glossaries[level - 1]
  return {
    audio: audioIndex[level - 1][week - 1],
    week,
    level,
    list: weekList,
    glossary,
  }
}
