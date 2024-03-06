import wordLists from '$lib/words-by-week.json'
import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  const { week, level } = params
  if (!(level >= 1 && level <= 5)) {
    throw error(404, 'Not found')
  }
  if (!(week >= 1 && week <= 36)) {
    throw error(404, 'Not found')
  }
  const levellist = wordLists[level - 1]
  const list = levellist[week - 1]?.list
  return {
    list,
    week,
    level,
  }
}
