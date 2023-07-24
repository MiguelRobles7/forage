export default {
  data() {
    return {
      doneLoading: false,
      restaurant: {
        backgroundImg: String,
        logo: String,
        name: String,
        desc: String,
        summary: String,
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
    this.$emit('doneNav')
    this.doneLoading = true
  },
  async mounted() {
    const supabase = useSupabaseClient()

    let { data: rv, error } = await supabase.from('reviews').select()

    if (error) {
      console.log(error)
    } else {
      console.log(this.reviews)
    }

    for (var i = 0; i < rv.length; i++) {
      if (rv[i].userId == this.$route.params.id) {
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
    console.log(this.reviews)
  }
}