import audioIndex from '$lib/audio-index.json'
import glossaries from '$lib/glossaries.json'
import wordLists from '$lib/words-by-week.json'
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
  const weekList = levellist[week]
  const glossary = glossaries[level - 1]
  return {
    audio: audioIndex[level - 1][week],
    week,
    level,
    list: weekList,
    glossary,
  }
}
