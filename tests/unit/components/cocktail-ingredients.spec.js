import { shallowMount } from '@vue/test-utils'
import CocktailIngredients from '@/.vuepress/components/cocktail-ingredients.vue'

describe('cocktail-ingredients.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(CocktailIngredients, {
      computed: {
        $page: {
          get() {
            return {
              frontmatter: {
                ingredients: [{
                  name: 'test',
                  amount: 1,
                  unit: 'parts',
                }]
              }
            }
          }
        },
        $site: {
          get() {
            return {
              pages: [
                {
                  path: '/ingredients/',
                  frontmatter: {
                    allIngredients: ['test']
                  }
                }
              ]
            };
          }
        },
      }
    })
  })
  describe('data', () => {
    it('has 3 data formats', () => {
      expect(wrapper.vm.formats).toEqual(["parts", "ml", "oz"])
    })
  })
  describe('the shotSize computed', () => {
    it('returns 1 by default', () => {
      expect(wrapper.vm.shotSize).toEqual(1)
    })
  })
  describe('the formattedIngredients computed', () => {
    it('has parts formatted ingredients by default', () => {
      expect(wrapper.vm.formattedIngredients).toEqual([{
        name: 'test',
        amount: 1,
        unit: 'parts',
      }])
    })
    it('returns ml formatted ingredients when selected', () => {
      wrapper.setData({ selectedFormat: 'ml' })
      expect(wrapper.vm.formattedIngredients).toEqual([{
        name: 'test',
        amount: 30,
        unit: 'ml',
      }])
    })
    it('returns oz formatted ingredients when selected', () => {
      wrapper.setData({ selectedFormat: 'oz' })
      expect(wrapper.vm.formattedIngredients).toEqual([{
        name: 'test',
        amount: 1,
        unit: 'oz',
      }])
    })
    it('returns scaled ml formatted ingredients', () => {
      wrapper.vm.$page.frontmatter.shotSize = 1.5
      wrapper.setData({ selectedFormat: 'ml' })
      expect(wrapper.vm.formattedIngredients).toEqual([{
        name: 'test',
        amount: 45,
        unit: 'ml',
      }])
    })
    it('returns scaled oz formatted ingredients', () => {
      wrapper.vm.$page.frontmatter.shotSize = 1.5
      wrapper.setData({ selectedFormat: 'oz' })
      expect(wrapper.vm.formattedIngredients).toEqual([{
        name: 'test',
        amount: 1.5,
        unit: 'oz',
      }])
    })
  })
})
