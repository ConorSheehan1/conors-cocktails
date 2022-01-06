/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default ({ Vue, options, router, siteData }) => {
  // Make BootstrapVue available throughout your project
  Vue.use(BootstrapVue);
  // Optionally install the BootstrapVue icon components plugin
  Vue.use(IconsPlugin);

  // global mixin, used in cocktails-carousel and cocktails
  // TODO: move to composition api / specific import mixin
  Vue.mixin({
    data() {
      return {
        isDarkMode: false,
      };
    },
    mounted() {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      this.isDarkMode = mql?.matches === true;
      mql.addEventListener("change", () => {
        if (window.matchMedia("(prefers-color-scheme: dark)")?.matches) {
          this.isDarkMode = true;
        } else {
          this.isDarkMode = false;
        }
      });
    },
    computed: {
      cocktailPages() {
        return this.$site.pages.filter((page) =>
          page.path.match("/cocktails/.+")
        );
      },
    },
    methods: {
      pageName(page) {
        return page.path.match("/cocktails/(.+).html")[1];
      },
      imagePath(page) {
        const name = this.pageName(page);
        return `/images/${name}/${name}.jpg`;
      },
    },
  });
};
