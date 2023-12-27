<script>
  let byWeek = false
</script>

<h2>Printable Word Searches</h2>
<p>Download each word search in PDF format.</p>

<button on:click={() => (byWeek = !byWeek)}>
  {#if byWeek}
    <span>Show word searches by level</span>
  {:else}
    <span>Show word searches by week</span>
  {/if}
</button>

{#if byWeek}
  {#each Array.from({ length: 36 }) as _, week}
    <h3>Week {week + 1}</h3>
    <ul>
      {#each ['1', '2', '3', '4', '5'] as level}
        <li>
          <a
            href="/wordsearches-pdf/wordsearch-level-{level}-week-{week +
              1}.pdf"
            rel="external"
          >
            Level {level}
          </a>
        </li>
      {/each}
    </ul>
  {/each}
  <p>stuff</p>
{:else}
  {#each ['1', '2', '3', '4', '5'] as level}
    <h3>Level {level}</h3>
    <ul>
      {#each Array.from({ length: 36 }) as _, index}
        <li>
          <a
            href="/wordsearches-pdf/wordsearch-level-{level}-week-{index +
              1}.pdf"
            rel="external"
          >
            Week {index + 1}
          </a>
        </li>
      {/each}
    </ul>
  {/each}
{/if}
