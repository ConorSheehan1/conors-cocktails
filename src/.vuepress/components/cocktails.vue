<template>
  <div>
    <div :key="i" v-for="(cocktailPage, i) in cocktailPages">
      <h3 :id="pageName(cocktailPage)">
        <a :href="cocktailPage.path">
          <span>
            {{ cocktailPage.title }}
          </span>
          <img
            :src="$withBase(imagePath(cocktailPage))"
            :alt="pageName(cocktailPage)"
          />
        </a>
      </h3>
    </div>
  </div>
</template>

<script>
// TODO: make searchable cocktail table
export default {
  computed: {
    cocktailPages() {
      return this.$site.pages.filter((page) =>
        page.path.match("\/cocktails\/.+")
      );
    },
  },
  methods: {
    pageName(page) {
      return page.path.match("\/cocktails\/(.+)\.html")[1];
    },
    imagePath(page) {
      const name = this.pageName(page);
      return `/images/${name}/${name}.jpg`;
    },
  },
};
</script>
