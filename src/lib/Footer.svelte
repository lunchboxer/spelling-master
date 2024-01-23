<script>
  import { page } from '$app/stores'

  const icp = '湘ICP备20004695号-1'
  function goTop() {
    document.body.scrollIntoView()
  }
</script>

<footer class="no-print">
  <p>
    {#if $page.route.id !== '/sitemap'}
      <a href="/sitemap">Sitemap</a>&nbsp;|&nbsp;
    {/if}
    <a href="#top" on:click={goTop}> Back to top </a>
  </p>
  <p>
    <span class="copy">&copy; 2023 James Smith</span>
    {#if icp}
      |
      <span class="icp">{icp}</span>
    {/if}
  </p>
</footer>

<style>
  footer {
    width: 100%;
    text-align: center;
    opacity: 0.6;
  }

  p {
    padding: 0;
    font-size: 1.3rem;
    margin: 2rem;
  }

  span {
    margin: 0 1rem;
  }
</style>
