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

    // for (let i = 0; i < this.restaurants.length; i++) {
    //   let rCount = 0
    //   let avRating = 0
    //   let { data: reviewQuery, reviewError } = await supabase
    //     .from('reviews')
    //     .select('*')
    //     .eq('restaurantId', this.restaurants[i].id)
    //   for (let j = 0; j < reviewQuery.length; j++) {
    //     if (!reviewQuery[j].isDeleted && !reviewQuery[j].isReply) {
    //       rCount++
    //       avRating += reviewQuery[j].rating
    //     }
    //   }
    //   this.restaurants[i].reviewCount = rCount
    //   this.restaurants[i].rating = Math.round((avRating / rCount) * 10) / 10
    // }

    this.doneLoading = true
  },
  methods: {
    searchClick() {
      // Redirect to search page with criteria
      this.$router.push('/establishment/search/' + this.searchCriteria)
    }
  }
}
