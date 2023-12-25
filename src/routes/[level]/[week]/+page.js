import { error } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if (!(params.level >= 1 && params.level <= 4)) {
    throw error(404, 'Not found')
  }
  if (!(params.week >= 1 && params.week <= 36)) {
    throw error(404, 'Not found')
  }
  return {
    week: params.week,
    level: params.level,
  }
}
