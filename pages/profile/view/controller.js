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
      establishments: [
        {
          name: 'Sussé Cafe',
          average_rating: 5,
          image: '/profile-view/susse.png'
        },
        {
          name: 'Imissyou Tiramisù',
          average_rating: 5,
          image: '/profile-view/imy.png'
        },
        {
          name: 'Akonlng Kainan',
          average_rating: 5,
          image: '/profile-view/akonlng.png'
        },
        {
          name: 'Boy Besprend Bar',
          average_rating: 5,
          image: '/profile-view/bbb.png'
        }
      ]
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
      let int_id = parseInt(this.id)
      for (let i = 0; i < rev.length; i++) {
        let { data: rest, error } = await supabase.from('restaurants').select().eq('id', rev[i].restaurantId)
        if (error) {
          console.log(error)
        } else {
          this.reviewRestaurants.push(rest[0].name)
          if (rev[i].userId === int_id && rev[i].isReply === false) {
            this.reviews.push(rev[i])
          }
        }
      }
    }

    this.doneLoading = true
  }
}
