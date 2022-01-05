<template>
  <b-carousel
    id="carousel"
    :interval="4000"
    controls
    indicators
    background="#ffffff"
    img-width="1024"
    img-height="240"
    style="text-shadow: 1px 1px 2px #333;"
  >
    <b-carousel-slide :caption="page.title" :img-src="imagePath(page)" :img-alt="page.title" :key="i" v-for="page, i in cocktailPages">
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
</script>

<style lang="stylus" scoped>
#carousel
  max-height 480px

::v-deep
  img
    border none
    border-radius 0
    padding 0
    margin 0
  .carousel-inner, .carousel-item
    border-radius 8px
    max-height 480px
</style>