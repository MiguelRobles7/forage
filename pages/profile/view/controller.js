import Users from '~/assets/JSON/profiles.json'

export default {
  data() {
    return {
      id: useRoute().params.id,
      reviews: [],
      reviewRestaurants: [],
      profile: {
        dpLink: String,
        bannerLink: String,
        name: String,
        account_type: String,
        description: String,
        city: String,
        province: String,
        country: String
      },
      doneLoading: false,
      establishments: []
    }
  },
  methods: {
    review() {
      navigateTo('/owner/manage-reviews/' + this.id)
    },
    setting() {
      navigateTo('/profile/edit/' + this.id)
    }
  },
  async mounted() {
    const userRequest = useFetch(`/api/users/public/${this.id}`, { immediate: false })
    await userRequest.execute({ _initial: true })
    const userData = userRequest.data.value.users[0]
    this.profile.name = userData.name
    this.profile.dpLink = userData.displayPicture
    this.profile.bannerLink = userData.banner
    this.profile.description = userData.description
    this.profile.city = userData.city
    this.profile.country = userData.country
    this.profile.province = userData.province

    const supabase = useSupabaseClient()
    let { data: rev, error } = await supabase.from('reviews').select()
    if (error) {
      console.log(error)
    } else {
      console.log('Got Reviews', rev)
    }

    for (let i = 0; i < rev.length; i++) {
      let int_id = parseInt(this.id)
      if (rev[i].userId === int_id && rev[i].isReply === false) {
        this.reviews.push(rev[i])
        let { data: rest, e } = await supabase.from('restaurants').select().eq('id', rev[i].restaurantId)
        if (e) {
          console.log(e)
        } else {
          this.reviewRestaurants.push(rest[0].name)
          console.log('Got Restaurants')
        }
      }
    }
    let { data: est, er } = await supabase.from('restaurants').select() //.eq('owner_id', userData.id)
    if (er) {
      console.log(er)
    } else {
      console.log(est)
      for (let j = 0; j < est.length; j++) {
        if (est[j].owner_id == userData.id) {
          console.log('Establishment Owner ID: ', est[j].owner_id)
          console.log('My ID: ', userData.id)

          this.establishments.push(est[j])
        }
      }
    }
    this.doneLoading = true
  }
}
