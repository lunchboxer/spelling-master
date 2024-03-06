<script>
  import AudioPlayer from './AudioPlayer.svelte'
  export let list
  export let audio = []
  export let level
  export let glossary
  export let showDefinitions = true
</script>

{#if list}
  <p class="no-print">{list?.description}</p>
  <ol>
    {#if list}
      {#each list.list as word, index}
        <li
          class:spaced={level === '1'}
          class:tight={level === '5' || level === '4'}
        >
          {#if showDefinitions}
            <strong>
              <AudioPlayer audioFiles={audio[index]} {word} />
            </strong>: {glossary[word] || 'no definition available'}
          {:else}
            <AudioPlayer audioFiles={audio[index]} {word} />
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
