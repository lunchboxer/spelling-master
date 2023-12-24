<script>
  import { generate } from '@sbj42/word-search-generator'
  export let data
  const { level, week, lists } = data
  let width = 16
  let height = 16
  if (level === '1') {
    width = 12
    height = 12
  }
  const list = lists[level - 1]
  const puzzle = generate({ words: list[week]?.list, width, height })

  function makeMatrix(array, size, out) {
    out = out || []
    if (array.length === 0) return out
    out.push(array.slice(0, size))
    return makeMatrix(array.slice(size), size, out)
  }
</script>

<svelte:head>
  <title>Level {level} Week {week} Word Search</title>
</svelte:head>

<h2>Level {level} Week {week} Word Search</h2>

{#if puzzle}
  <div class="container">
    <div class="puzzle">
      {#each makeMatrix(puzzle.grid, width) as row}
        <div class="row">
          {#each row as cell}
            <div class="letter">{cell}</div>
          {/each}
        </div>
      {/each}
    </div>
    <div class="words no-print">
      {#each puzzle.words as word}
        <div class="word">{word}</div>
      {/each}
    </div>
  </div>
{/if}

<style>
  .container {
    width: 100%;
    justify-content: center;
    flex-wrap: nowrap;
    display: flex;
  }
  .puzzle {
    display: flex;
    flex-direction: column;
  }
  .row {
    flex-shrink: 0;
    display: flex;
  }
  .words {
    padding: 0 1rem;
    margin: 0 1rem;
    width: auto;
    border-left: 1px solid #aaa;
  }
  .word {
    height: 30px;
  }
  .letter {
    text-wrap: nowrap;
    text-align: center;
    float: left;
    width: 30px;
    height: 30px;
    padding: 0;
    margin: 0;
  }
  @media print {
    .letter {
      font-size: 16pt;
    }
    .row {
      font-size: 16pt;
      margin: 0;
      padding: 2px;
    }
    .word {
      font-size: 12pt;
    }
  }
</style>
