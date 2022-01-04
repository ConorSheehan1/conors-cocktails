<template>
  <div>
    <select v-model="selectedFormat">
      <option :key="i" v-for="(format, i) in formats" :value="format">
        {{ format }}
      </option>
    </select>
    <ul>
      <li :key="i" v-for="(ingredient, i) in formattedIngredients">
        {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
      </li>
    </ul>
  </div>
</template>

<script>
// requires ingredients in frontmatter
export default {
  data() {
    return {
      formats: ["parts", "ml", "oz"],
      selectedFormat: "parts",
    };
  },
  computed: {
    ingredients() {
      return this.$page.frontmatter.ingredients;
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
  },
  methods: {
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
        amount: Math.round(ingredient.amount * 45),
        unit: "ml",
        // 1 jigger -> millileters 44.3603
      };
    },
    ozFormat(ingredient) {
      if (!this.isPartsIngredient(ingredient)) return ingredient;

      return {
        ...ingredient,
        amount: Math.round(ingredient.amount * 1.6),
        unit: "oz",
        // 1 jigger -> fliud ounces 1.56126
      };
    },
  },
};
</script>
