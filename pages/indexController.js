import { fetchRestaurant } from '@/factories/restaurantFactory'

export default {
  data() {
    return {
      restaurants: [],
      doneLoading: false,
      searchCriteria: ''
    }
  },
  async mounted() {
    this.restaurants = await fetchRestaurant()
    this.doneLoading = true
  },
  methods: {
    searchClick() {
      this.$router.push('/establishment/search/' + this.searchCriteria)
    }
  }
}
