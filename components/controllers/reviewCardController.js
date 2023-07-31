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
      if (!this.isLoggedIn) { 
        console.log('Upvote discontinued')
        return
      }
      else if (this.review.isUpvoted || this.clientisUpvoted) {
        this.revokeUpvote()
        return
      }
      const upvotes = this.review.upvotes
      const reviewID = this.review.id
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID,
      }

      await useFetch('/api/reviews/upvotes/update', {
        method: 'POST',
        body: data
      })
      await useFetch('/api/user_upvotes/new/', {
        method: 'POST',
        body: data
      })

      this.clientUpvotes = this.clientUpvotes + 1
      this.clientisUpvoted = true
    },
    async revokeUpvote() {
      const upvotes = this.review.upvotes
      const reviewID = this.review.id
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID,
      }

      await useFetch('/api/reviews/upvotes/revoke/', {
        method: 'POST',
        body: data
      })
      await useFetch('/api/user_upvotes/delete/', {
        method: 'POST',
        body: data
      })

      this.clientUpvotes = this.clientUpvotes - 1
      this.clientisUpvoted = false 
    },
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
