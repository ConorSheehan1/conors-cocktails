<template>
  <b-table
    id="cocktail-table"
    :items="tableData"
    :fields="tableFields"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :dark="isDarkMode"
    sort-icon-left
    responsive="lg"
    striped
    hover
    @row-clicked="onRowClicked"
  >
    <template #cell(image)="data">
      <img :src="$withBase(data.value.imagePath)" :alt="data.value.imageName" />
    </template>
  </b-table>
</template>

<script>
// TODO: fix mobile table
// vue-component-media-queries?
// completely different layout for mobile, split across 2+ rows and show iamges
export default {
  data() {
    return {
      sortBy: "title",
      sortDesc: false,
      tableFields: [
        {
          key: "image",
          label: "",
        },
        {
          key: "title",
          sortable: true,
        },
        {
          key: "difficulty",
          sortable: true,
        },
        {
          key: "ingredients",
          formatter(ingredients) {
            return ingredients.map((v) => v.name).join(", ");
          },
        },
        {
          key: "flavours",
          formatter(flavours) {
            return flavours.join(", ");
          },
        },
      ],
    };
  },
  computed: {
    tableData() {
      return this.cocktailPages.map((page) => {
        const imagePath = this.imagePath(page);
        const pageName = this.pageName(page);
        return {
          ...page.frontmatter,
          image: {
            imagePath,
            pageName,
          },
          path: page.path,
        };
      });
    },
  },
  methods: {
    onRowClicked(record, index) {
      this.$router.push(record.path);
    },
  },
};
</script>

<style lang="stylus" scoped>
// #cocktail-table
//   width: 80%

img
  margin auto

::v-deep table
  border-radius 8px !important
</style>
