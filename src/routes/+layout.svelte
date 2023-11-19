<script>
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '@picocss/pico'
  import '../app.css'
</script>

<Header />

<main class="container">
  <slot />
</main>

<Footer />

<style>
  main {
    margin-top: 4rem;
  }
</style>
