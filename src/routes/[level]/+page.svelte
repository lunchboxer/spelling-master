<script>
  import ListSelector from '$lib/ListSelector.svelte'
  import AllWordsList from '$lib/AllWordsList.svelte'

  export let data
  $: list = data.list
  $: level = data.level
  $: glossary = data.glossary
  let showDefinitions = true
</script>

<h2>Level {level} Words</h2>

<ListSelector bind:level bind:showDefinitions />

<AllWordsList {list} {glossary} {showDefinitions} />
