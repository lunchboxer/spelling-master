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
    font-family: 'Lexend', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin-top: 1rem;
  }
  @media print {
    main {
      width: 100%;
      max-width: unset;
      margin: 0;
      padding: 0;
    }
  }
</style>
