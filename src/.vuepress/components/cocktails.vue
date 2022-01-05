<template>
  <div>
    <b-table
      :items="cocktailPages.map(v => v.frontmatter)"
      :fields="tableFields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      sort-icon-left
      responsive="sm"
      striped
      hover
    >
    </b-table>
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
  data() {
    return {
      sortBy: 'title',
      sortDesc: false,
      tableFields: [
        'title',
        'ingredients',
        'flavours',
        'difficulty'
      ]
    }
  },
  computed: {
    cocktailPages() {
      return this.$site.pages.filter((page) =>
        page.path.match("\/cocktails\/.+")
      );
    },
    // tableData() {
    //   return this.cocktailPages.map(page => {
    //     const {  }
    //     return {
    //       ...page.frontmatter,

    //     }
    //   });
    // },
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
