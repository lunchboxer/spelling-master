<script>
  export let list
  export let glossary
  export let showDefinitions = true

  let searchString = ''
  $: filteredList = searchString
    ? list.filter((word) => word.includes(searchString))
    : list
</script>

{#if list && list.length > 0}
  <lable for="search">Search</lable>
  <input id="search" type="text" bind:value={searchString} />
  <p>Showing {filteredList.length} words</p>
  <ul>
    {#each filteredList as word}
      <li>
        <strong>{word}</strong>
        {#if showDefinitions}: {glossary[word] || 'no definition available'}
        {/if}
      </li>
    {/each}
  </ul>
{:else}
  <p>No words found</p>
{/if}
