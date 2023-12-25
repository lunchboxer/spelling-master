<script>
  import { goto } from '$app/navigation'

  export let showDefinitions = true
  export let level
  let intLevel = Number.parseInt(level)
  export let week = 0
  let intWeek = Number.parseInt(week)
  const weekNumbers = Array.from({ length: 36 }, (value, index) => 1 + index)

  function goThere() {
    if (intWeek) {
      goto(`/${intLevel}/${intWeek}/`)
    } else {
      goto(`/${intLevel}/`)
    }
  }
</script>

<div class="grid">
  <fieldset>
    <label for="level">Level</label>
    <select id="level" bind:value={intLevel} on:change={goThere}>
      {#each [1, 2, 3, 4] as levelNumber}
        <option value={levelNumber}>{levelNumber}</option>
      {/each}
    </select>
  </fieldset>
  <fieldset>
    <label for="week">Week</label>
    <select id="week" bind:value={intWeek} on:change={goThere}>
      <option value={0}>All</option>
      {#each weekNumbers as weekNumber}
        <option value={weekNumber}>{weekNumber}</option>
      {/each}
    </select>
  </fieldset>

  <fieldset>
    <label for="defitions">Definitions</label>
    <button
      id="definitions"
      on:click={() => (showDefinitions = !showDefinitions)}
    >
      {#if showDefinitions}
        Hide
      {:else}
        Show
      {/if}
    </button>
  </fieldset>
</div>

<style>
  .grid {
    display: flex;
    width: 100%;
  }
  .grid > * {
    margin-right: 2rem;
  }
  select {
    width: 8rem;
  }
</style>
