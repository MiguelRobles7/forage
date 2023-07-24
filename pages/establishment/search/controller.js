import Restaurants from '~/assets/JSON/restaurants.json'

export default {
  data() {
    return {
      phrase: useRoute().params.query,
      restaurants: Restaurants
    }
  },
  computed: {
    // TODO: Handle more than 5 results
    filteredRestaurants() {
      let filtered = this.restaurants.filter((restaurant) => {
        return restaurant.name.toLowerCase().includes(this.phrase.toLowerCase())
      })
      if (filtered.length > 5) {
        return filtered.slice(0, 5)
      }
      return filtered
    }
  }
}