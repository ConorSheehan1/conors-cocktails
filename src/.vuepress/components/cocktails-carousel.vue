<template>
  <b-carousel
    id="cocktail-carousel"
    :interval="5000"
    controls
    indicators
    background="#ddd"
    style="text-shadow: 1px 1px 2px #333"
  >
    <b-carousel-slide
      :caption-html="captionLink(page)"
      :img-src="imagePath(page)"
      :img-alt="page.title"
      :key="i"
      v-for="(page, i) in cocktailPages"
    >
    </b-carousel-slide>
  </b-carousel>
</template>

<script>
export default {
  methods: {
    captionLink(page) {
      return `<a style="color: white;" href=${page.path}>${page.title}</a>`;
    },
  },
};
</script>

<style lang="stylus" scoped>
$max-height = 700px
$max-width = 700px
#cocktail-carousel
  max-height $max-height
  max-width $max-width
  border-radius 8px
  margin auto

// TODO: fix desktop images
// @media (min-width: 500px)
//   ::v-deep img
//     height 80vh !important

::v-deep
  img
    border none
    border-radius 0
    padding 0
    margin 0
  .carousel-inner, .carousel-item
    border-radius 8px
    max-height $max-height
    max-width $max-width
</style>
