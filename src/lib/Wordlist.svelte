<script>
  export let list
  export let week
  export let glossary
  export let showDefinitions = true
</script>

<h2>Words</h2>
<p>{list[week]?.description}</p>
<ol>
  {#if list[week]}
    {#each list[week].list as word}
      <li>
        <strong>{word}</strong>{#if showDefinitions}: {glossary[word] ||
            'no definition available'}{/if}
      </li>
    {/each}
  {/if}
</ol>
