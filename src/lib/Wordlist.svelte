<script>
  export let list
  export let level
  export let week = ''
  export let glossary
  export let showDefinitions = true
</script>

{#if list}
  <p class="no-print">{list[week]?.description}</p>
  <ol>
    {#if list[week]}
      {#each list[week].list as word}
        <li
          class:spaced={level === '1'}
          class:tight={level === '5' || level === '4'}
        >
          <strong>{word}</strong>{#if showDefinitions}: {glossary[word] ||
              'no definition available'}{/if}
        </li>
      {/each}
    {/if}
  </ol>
{/if}

<style>
  @media print {
    li.spaced {
      margin: 1rem 1.5rem;
    }

    li.tight {
      margin-right: 0;
      padding-right: 0;
      line-height: 1.4;
    }
  }
</style>
