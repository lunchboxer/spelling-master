<script>
</script>

<h1>Sitemap</h1>

<h2>Word lists</h2>

<ul>
  {#each Array.from({ length: 36 }) as _, index}
    <li>
      Week {index + 1} : <a href="/{index + 1}/A">A</a> /
      <a href="{index + 1}/B">B</a>
    </li>
  {/each}
</ul>

<h2>Word searches</h2>

<ul>
  {#each Array.from({ length: 36 }) as _, index}
    <li>
      Week {index + 1} : <a href="/{index + 1}/A/wordsearch">A</a> /
      <a href="/{index + 1}/B/wordsearch">B</a>
    </li>
  {/each}
</ul>
