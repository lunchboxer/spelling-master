<script>
  import Wordlist from '$lib/Wordlist.svelte'
  import ListSelector from '$lib/ListSelector.svelte'

  export let data
  const { lists, glossaries } = data
  $: week = data.week
  $: level = data.level
  $: list = lists[level - 1]
  $: glossary = glossaries[level - 1]
  let showDefinitions = true
</script>

<h2>Level {level} Week {week}</h2>
<ListSelector bind:level bind:week bind:showDefinitions />
<a href={`/${level}/${week}/wordsearch`}>Word Search</a>

<Wordlist {list} {week} {glossary} {showDefinitions} />
