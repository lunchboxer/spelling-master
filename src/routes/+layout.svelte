<script>
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '@picocss/pico'
  import '../app.css'
</script>

<main class="container">
  <Header />
  <slot />
</main>

<Footer />

<style>
  main {
    margin-top: 1rem;
  }
</style>
