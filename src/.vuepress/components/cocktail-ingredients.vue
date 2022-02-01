<template>
  <div>
    <select v-model="selectedFormat">
      <option :key="i" v-for="(format, i) in formats" :value="format">
        {{ format }}
      </option>
    </select>
    <ul>
      <li :key="i" v-for="(ingredient, i) in formattedIngredients">
        <span> {{ ingredient.amount }} {{ ingredient.unit }} </span>
        <span v-if="hasIngredientLink(ingredient)">
          <a :href="ingredientLink(ingredient)">{{ ingredient.name }}</a>
        </span>
        <span v-else>
          {{ ingredient.name }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { get, round } from "lodash";
// TODO: switch from select to b-button-group? show all options in advance
// requires ingredients in frontmatter
export default {
  data() {
    return {
      formats: ["parts", "ml", "oz"],
      selectedFormat: "parts",
    };
  },
  computed: {
    // ingredients for this cocktail
    ingredients() {
      return this.$page.frontmatter.ingredients;
    },
    // TODO: test for this, broke when added emoji to title
    allIngredients() {
      // ingredients listed on the ingredients page#
      return this.$site.pages.find((v) => v.path === "/ingredients/")
        .frontmatter.allIngredients;
    },
    formattedIngredients() {
      return this.ingredients.map(this[`${this.selectedFormat}Format`]);
    },
    totalParts() {
      return this.ingredients.reduce((acc, ingredient) => {
        if (this.isPartsIngredient(ingredient)) {
          acc += parseInt(ingredient.amount, 10);
        }
      }, 0);
    },
    shotSize() {
      return get(this.$page.frontmatter, "shotSize", 1);
    },
  },
  methods: {
    ingredientLink({ name }) {
      return `/ingredients#${name.replace(" ", "-")}`;
    },
    hasIngredientLink({ name }) {
      return this.allIngredients.includes(name);
    },
    isPartsIngredient({ unit }) {
      return unit.toLowerCase().includes("part");
    },
    // recipes are defined in parts, so just return original
    partsFormat(ingredient) {
      return ingredient;
    },
    // conversions source https://support.google.com/websearch/answer/3284611?hl=en-IE#unitconverter
    mlFormat(ingredient) {
      if (!this.isPartsIngredient(ingredient)) return ingredient;

      return {
        ...ingredient,
        amount: round(ingredient.amount * (30 * this.shotSize), 2),
        unit: "ml",
        // 1 jigger -> millileters 44.3603
        // regular shot size 30ml, large 1.5 -> 45ml
      };
    },
    ozFormat(ingredient) {
      if (!this.isPartsIngredient(ingredient)) return ingredient;

      return {
        ...ingredient,
        amount: round(ingredient.amount * this.shotSize, 2),
        unit: "oz",
        // 1 jigger -> fliud ounces 1.56126
        // regular shot size 1oz, large 1.5 -> 1,5oz
      };
    },
  },
};
</script>

<style lang="stylus" scoped>
select
  margin 1em
</style>
