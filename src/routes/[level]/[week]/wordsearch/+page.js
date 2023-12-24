/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    week: params.week,
    level: params.level,
  }
}
