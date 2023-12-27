<script>
  let byWeek = false
</script>

<h2>Printable spelling lists</h2>
<p>Download each spelling list in PDF format.</p>

<button on:click={() => (byWeek = !byWeek)}>
  {#if byWeek}
    <span>Show lists by level</span>
  {:else}
    <span>Show lists by week</span>
  {/if}
</button>

{#if byWeek}
  {#each Array.from({ length: 36 }) as _, week}
    <h3>Week {week + 1}</h3>
    <ul>
      {#each ['1', '2', '3', '4', '5'] as level}
        <li>
          <a
            href="/lists-pdf/spelling-level-{level}-week-{week + 1}.pdf"
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
            href="/lists-pdf/spelling-level-{level}-week-{index + 1}.pdf"
            rel="external"
          >
            Week {index + 1}
          </a>
        </li>
      {/each}
    </ul>
  {/each}
{/if}
