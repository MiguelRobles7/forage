import Users from '~/assets/JSON/profiles.json'
import Reviews from '~/assets/JSON/reviews.json'
import Restaurants from '~/assets/JSON/restaurants.json'

export default {
  props: {
    /* Unused
    restaurant: {
      type: Object,
      required: true
    }*/
  },
  computed: {
    restaurant() {
      const obj = this.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id === Number(this.id)
      })[0]

      return this.restaurants.filter((restaurant) => {
        return restaurant.restaurant_id === Number(this.id)
      })[0]
    },

    menu_items() {
      return this.menu.filter((row) => {
        return row.restaurant_id === Number(this.id)
      })
    },

    current_reviews() {
      return this.reviews.filter((review) => {
        return review.restaurant_id === Number(this.id)
      })
    }
  },
  methods: {
    edit: function () {
      this.getUserID()
      this.modal = true
    },
    async getUserID() {
      const supabase = useSupabaseClient()
      let uid = null
      try {
        const { data, error } = await supabase.auth.getSession()
        uid = data.session.user.id
        console.log(uid)
        if (error) throw error
      } catch (error) {
        console.log(error)
      }

      try {
        const { data, error } = await supabase.from('profiles').select('profile_id').eq('id', uid)
        if (error) {
          throw error
        } else {
          this.userID = data[0].profile_id
          console.log(this.userID)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  data() {
    return {
      restaurants: Restaurants,
      id: useRoute().params.id,

      users: Users,
      modal: false,
      userID: null
    }
  }
}