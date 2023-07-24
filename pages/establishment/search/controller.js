export default {
  data() {
    return {
      phrase: useRoute().params.query,
      restaurants: [],
      doneLoading: false,
      rows: 1,
      filteredRestaurants: [[]]
    }
  },
  computed: {},
  async mounted() {
    const restaurantsFetch = useFetch('/api/restaurants/', { immediate: false })
    await restaurantsFetch.execute({ _initial: true })
    this.restaurants = restaurantsFetch.data.value.restaurants
    let count = 0
    let index = 0
    for (let i = 0; i < this.restaurants.length; i++) {
      if (this.restaurants[i].name.toLowerCase().includes(this.phrase.toLowerCase())) {
        this.filteredRestaurants[index].push(this.restaurants[i])
        if (count > 4) {
          count = 0
          index++
        } else {
          count++
        }
      }
    }
    this.doneLoading = true
  }
}
