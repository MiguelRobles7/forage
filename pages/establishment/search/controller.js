import { searchRestaurants } from '@/factories/restaurantFactory'

export default {
  data() {
    return {
      phrase: useRoute().params.query,
      filteredRestaurants: [],
      doneLoading: false
    }
  },
  async mounted() {
    this.filteredRestaurants = await searchRestaurants(this.phrase)
    this.doneLoading = true
  }
}
