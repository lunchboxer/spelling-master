<script>
  export let showDefinitions = true
</script>

<fieldset>
  <label for="definitions"> Show definitions </label>
  <input
    type="checkbox"
    bind:checked={showDefinitions}
    id="definitions"
    name="definitions"
    role="switch"
  />
</fieldset>
