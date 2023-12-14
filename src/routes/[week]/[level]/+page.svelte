<script>
  export let data
  const { level, week } = data
  const list = level === 'A' ? data?.level4List : data?.level3List
</script>

{#each list[week].list as word}
  <li>{word}</li>
{/each}
