<template>
<div>
  <h3 :id="pageName(cocktailPage)" :key="i" v-for="cocktailPage, i in cocktailPages">
    <a :href="cocktailPage.path">
      {{ cocktailPage.title }}
    </a>
  </h3>
</div>
</template>

<script>
  // TODO: make searchable cocktail table
  export default {
    computed: {
      cocktailPages() {
        return this.$site.pages.filter(page => page.path.match('\/cocktails\/.+'));
      }
    },
    methods: {
      pageName(page) {
        return page.path.match('\/cocktails\/(.+)\.html')[1];
      }
    }
  }
</script>
