<script>
  export let list
  export let level
  export let glossary
  export let showDefinitions = true
</script>

{#if list}
  <p class="no-print">{list?.description}</p>
  <ol>
    {#if list}
      {#each list.list as word}
        <li
          class:spaced={level === '1'}
          class:tight={level === '5' || level === '4'}
        >
          {#if showDefinitions}
            <strong>{word}</strong>: {glossary[word] ||
              'no definition available'}
          {:else}
            {word}
          {/if}
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
