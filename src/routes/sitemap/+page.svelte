<script>
</script>

<h1>Sitemap</h1>

<h2>Word lists</h2>

<ul>
  {#each Array.from({ length: 36 }) as _, index}
    <li>
      Week {index + 1} : Level <a href="/1/{index + 1}/">1</a> |
      <a href="/2/{index + 1}">2</a> |
      <a href="/3/{index + 1}">3</a> |
      <a href="/4/{index + 1}">4</a>
    </li>
  {/each}
</ul>

<h2>Word searches</h2>

<ul>
  {#each Array.from({ length: 36 }) as _, index}
    <li>
      Week {index + 1} : Level <a href="/1/{index + 1}/wordsearch">1</a> |
      <a href="/2/{index + 1}/wordsearch">2</a> |
      <a href="/3/{index + 1}/wordsearch">3</a> |
      <a href="/4/{index + 1}/wordsearch">4</a>
    </li>
  {/each}
</ul>
