import { error } from '@sveltejs/kit'

import wordLists from '$lib/words-all.json'

import glossaries from '$lib/glossaries.json'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (!(params.level >= 1 && params.level <= 5)) {
    throw error(404, 'Not found')
  }

  return {
    list: wordLists[params.level - 1],
    glossary: glossaries[params.level - 1],
    week: params.week,
    level: params.level,
  }
}
