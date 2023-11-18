<script>
  export let data
  let level = 'A'
  let week = 1
  $: list = level === 'A' ? data?.level4List : data?.level3List
  $: glossary = level === 'A' ? data?.level4glossary : data?.level3glossary
</script>

<h1>Spelling Master</h1>

<p>
  Spelling Master enables you to view all Grade 4 spelling words with simple
  definitions and example sentences.
</p>
<h2>Level</h2>

<select bind:value={level}>
  <option value="A">A</option>
  <option value="B">B</option>
</select>

<h2>Week</h2>
<select bind:value={week}>
  {#each Array.from({ length: 36 }) as _, index}
    <option value={index + 1}>{index + 1}</option>
  {/each}
</select>

{#if list}
  <h2>Words</h2>
  <p>{list[week]?.description}</p>
  <ol>
    {#if list[week]}
      {#each list[week].list as word}
        <li>
          <strong>{word}</strong>: {glossary[word] || 'no definition available'}
        </li>
      {/each}
    {/if}
  </ol>
{/if}
