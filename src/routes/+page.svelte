<script>
  export let data
  let level = 'A'
  let week = 1
  $: list = level === 'A' ? data?.level4List : data?.level3List
  $: glossary = level === 'A' ? data?.level4glossary : data?.level3glossary
  let showDefinitions = true
</script>

<h1>Spelling Master</h1>

<p>
  Spelling Master enables you to view all Grade 4 spelling words with simple
  definitions and example sentences.
</p>

<div class="grid">
  <fieldset>
    <label for="week">Week</label>
    <select id="week" bind:value={week}>
      {#each Array.from({ length: 36 }) as _, index}
        <option value={index + 1}>{index + 1}</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="level">Level</label>

    <input bind:group={level} type="radio" name="level" value="A" /> A
    <input bind:group={level} type="radio" name="level" value="B" /> B
  </fieldset>

  <fieldset>
    <label for="definitions"> Show definitions </label>
    <input
      type="checkbox"
      bind:checked={showDefinitions}
      id="definitions"
      name="definitions"
      role="switch"
    />
  </fieldset>
</div>
{#if list}
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
{/if}
