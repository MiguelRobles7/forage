export default {
  data() {
    return {
      restaurants: [],
      doneLoading: false,
      searchCriteria: ''
    }
  },
  async mounted() {
    const supabase = useSupabaseClient()
    const restaurantsFetch = useFetch('/api/restaurants/', { immediate: false })
    await restaurantsFetch.execute({ _initial: true })
    this.restaurants = restaurantsFetch.data.value.restaurants
    this.doneLoading = true
  },
  methods: {
    searchClick() {
      // Redirect to search page with criteria
      this.$router.push('/establishment/search/' + this.searchCriteria)
    }
  }
}
