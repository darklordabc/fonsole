<template>
  <div id="preview">
    <img src="~@/assets/preview_vignette.png" id="previewImage">
    <label :id="`gameName${gameID}`">{{ `a game that is called ${gameID}` }}</label>
  </div>
</template>

<script>
  export default {
    name: 'Preview',
    props: ['gameID'],
  };
</script>

<style lang="sass" scoped>
  #preview
    height: 100%
    background: url('~@/assets/preview_background.png') center
    background-size: cover
    background-repeat: no-repeat

    #previewImage
      bottom: 0
      left: 0
      position: absolute
      width: 100%
      height: 5vh
      overflow: hidden

    label[id^="gameName"]
      font-size: 2vh
      margin: 5px
      position: absolute
      bottom: 0
      left: 0
</style>
