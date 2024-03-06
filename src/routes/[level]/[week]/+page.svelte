<script>
  import Wordlist from '$lib/Wordlist.svelte'
  import ListSelector from '$lib/ListSelector.svelte'

  export let data
  $: glossary = data.glossary
  $: week = data.week
  $: level = data.level
  $: list = data.list
  let showDefinitions = true
</script>

<h2>Level {level} Week {week}</h2>
<div class="no-print">
  <ListSelector bind:level bind:week bind:showDefinitions />
</div>

<Wordlist {level} {list} {week} {glossary} {showDefinitions} />

<a href={`/${level}/${week}/wordsearch`} class="no-print">Word Search</a>
