export default {
  props: {
    isLoggedIn: Boolean,
    loggedUserID: String,
    restaurantID: Number,
    owner_image: String,
    review: Object
  },

  methods: {
    view_discussion: function () {
      this.modal = true
    },
    async triggerUpvote() {
      if (!this.isLoggedIn || this.review.isUpvoted || this.clientisUpvoted) {
        console.log('Upvote discontinued')
        return
      }
      const upvotes = this.review.upvotes
      const reviewID = this.review.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      await useFetch('/api/reviews/', {
        method: 'POST',
        body: data
      })
      await useFetch('/api/user_upvotes/', {
        method: 'POST',
        body: data
      })

      this.clientUpvotes = this.clientUpvotes + 1
      this.clientisUpvoted = true
    }
  },
  data() {
    return {
      modal: false,
      restaurant: Object,
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean
    }
  },
  async mounted() {
    this.clientUpvotes = this.review.upvotes
    this.clientDownvotes = this.review.downvotes
    this.clientisUpvoted = this.review.isUpvoted
    const supabase = useSupabaseClient()

    let { data: resto, error } = await supabase.from('restaurants').select()
    if (error) {
      console.log(error)
    } else {
      for (let i = 0; i < resto.length; i++) {
        if (resto[i].id === this.restaurantID) {
          this.restaurant = resto[i]
          break
        } else console.log('Failed')
      }
    }
  }
}
