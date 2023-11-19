<script>
  import Footer from '$lib/Footer.svelte'
  import '@picocss/pico'
  import '../app.css'
</script>

<main class="container">
  <slot />
</main>

<Footer />

<style>
  main {
    margin-top: 2rem;
  }
</style>
