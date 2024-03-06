<script>
  export let audioFiles = []
  export let word

  const audioDirectory = '/audio/'

  let currentAudioIndex = 0

  let audioElement
  let fileType

  function getFileType(extension) {
    return extension === 'ogg' ? 'audio/ogg' : 'audio/mpeg'
  }

  function playNextAudio() {
    audioElement.pause()
    currentAudioIndex = (currentAudioIndex + 1) % audioFiles.length
    const fileExtension = audioFiles[currentAudioIndex].split('.').pop()
    fileType = getFileType(fileExtension)
    audioElement.load()
    audioElement.play()
  }
</script>

{#if audioFiles?.length > 0}
  <button on:click={playNextAudio}>{word}</button>
  <audio preload="none" bind:this={audioElement}>
    <source
      type={fileType}
      src="{audioDirectory}{audioFiles[currentAudioIndex]}"
    />
  </audio>
{:else}
  {word}
{/if}

<style>
  button {
    all: unset;
    cursor: pointer;
  }
</style>
