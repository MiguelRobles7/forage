export default {
  data() {
    return {
      doneLoading: false,
      restaurant: {
        backgroundImg: String,
        logo: String,
        name: String,
        desc: String,
        location: String,
        openingTime: String,
        closingTime: String,
        rating: Number,
        reviewCount: Number
      },

      reviews: [],
      restaurantNames: [],
      profile_picture: String,
      name: String,
      account_type: 'personal'
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.name = userData.name
      this.profile_picture = userData.displayPicture
    }
    this.doneLoading = true
  },
  async mounted() {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    const userFetch = useFetch(`/api/users/session/${user.value.id}`, { immediate: false })
    await userFetch.execute({ _initial: true })
    const userID = userFetch.data.value.users[0].profile_id

    const reviewsFetch = useFetch(`/api/reviews/user/${userID}`, { immediate: false })
    await reviewsFetch.execute({ _initial: true })
    const rv = reviewsFetch.data.value.reviews

    for (var i = 0; i < rv.length; i++) {
      if (rv[i].isDeleted === false && rv[i].isReply === false) {
        let { data: restoName, error } = await supabase.from('restaurants').select('name').eq('id', rv[i].restaurantId)
        if (error) {
          console.log(error)
        } else {
          console.log(restoName)
        }
        this.restaurantNames.push(restoName[0].name)
        this.reviews.push(rv[i])
      }
    }
  }
}
