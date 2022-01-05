<template>
  <b-table
    :items="tableData"
    :fields="tableFields"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    sort-icon-left
    responsive="lg"
    striped
    hover
    @row-clicked="onRowClicked"
  >
    <template #cell(image)="data">
      <img
        :src="$withBase(data.value.imagePath)"
        :alt="data.value.imageName"
      />
    </template>
  </b-table>
</template>

<script>
export default {
  data() {
    return {
      sortBy: 'title',
      sortDesc: false,
      tableFields: [
        {
          key: 'image',
          label: '',
        },
        {
          key: 'title',
          sortable: true,
        },
        {
          key: 'difficulty',
          sortable: true,
        },
        {
          key: 'ingredients',
          formatter(ingredients) {
            return ingredients.map(v => v.name).join(', ')
          },
        },
        {
          key: 'flavours',
          formatter(flavours) {
            return flavours.join(', ')
          },
        },
      ]
    }
  },
  computed: {
    cocktailPages() {
      return this.$site.pages.filter((page) =>
        page.path.match("\/cocktails\/.+")
      );
    },
    tableData() {
      return this.cocktailPages.map(page => {
        const imagePath = this.imagePath(page)
        const pageName = this.pageName(page)
        return {
          ...page.frontmatter,
          image: {
            imagePath,
            pageName,
          },
          path: page.path,
        }
      });
    },
  },
  methods: {
    onRowClicked(record, index) {
      this.$router.push(record.path)
    },
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

<style lang="stylus" scoped>
img
  margin auto

::v-deep table
  border-radius 8px !important

</style>
