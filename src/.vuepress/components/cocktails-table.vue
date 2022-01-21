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
// switch to alternate table? https://codepen.io/erinesullivan/pen/JvoBvq
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
          // TODO: custom sort once hard difficulty is added.
          // for now easy and medium are sorted correctly alphbetically.
          key: "difficulty",
          sortable: true,
          formatter: difficulty => {
            return this.capitalize(difficulty)
          }
        },
        // TODO: add back in after adding filters
        // ensure works on mobile, possibly only desktop?
        // {
        //   key: "ingredients",
        //   formatter(ingredients) {
        //     return ingredients.map((v) => v.name).join(", ");
        //   },
        // },
        {
          key: "flavours",
          formatter: flavours => {
            return flavours.map(this.capitalize).join(", ");
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

@media screen and (max-width: 600px)
  img
    padding: 0
    margin: 0
    border-radius 4px
    min-width 80px

::v-deep table
  border-radius 8px
</style>
