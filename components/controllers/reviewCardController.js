export default {
  props: {
    isLoggedIn: Boolean,
    loggedUserID: String,
    restaurantID: Number,
    owner_image: String,
    review: Object
  },

  methods: {
    toggleModal() {
      this.modal = !this.modal
    },
    view_discussion: function () {
      this.modal = true
    },
    async triggerUpvote() {
      await upvoteHandler.triggerVote(
        this.isLoggedIn,
        this.clicked,
        this.reviewID,
        this.restaurantID,
        this.loggedUserID,
        this.isDownvoted || this.clientisDownvoted,
        this.revokeDownvote,
        this.clientUpvotes,
        '/api/reviews/upvotes/update/',
        '/api/user_upvotes/new/'
      )
    },

    async revokeUpvote() {
      await upvoteHandler.revokeVote(
        this.clicked,
        this.reviewID,
        this.restaurantID,
        this.loggedUserID,
        this.clientUpvotes,
        '/api/reviews/upvotes/revoke/',
        '/api/user_upvotes/delete/'
      )
    },

    async triggerDownvote() {
      await downvoteHandler.triggerVote(
        this.isLoggedIn,
        this.clicked,
        this.reviewID,
        this.restaurantID,
        this.loggedUserID,
        this.isUpvoted || this.clientisUpvoted,
        this.revokeUpvote,
        this.clientDownvotes,
        '/api/reviews/downvotes/update/',
        '/api/user_downvotes/new/'
      )
    },

    async revokeDownvote() {
      await downvoteHandler.revokeVote(
        this.clicked,
        this.reviewID,
        this.restaurantID,
        this.loggedUserID,
        this.clientDownvotes,
        '/api/reviews/downvotes/revoke/',
        '/api/user_downvotes/delete/'
      )
    }
  },
  data() {
    return {
      modal: false,
      clicked: false,
      restaurant: Object,
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean,
      clientisDownvoted: Boolean
    }
  },
  async mounted() {
    this.clientUpvotes = this.review.upvotes
    this.clientDownvotes = this.review.downvotes
    this.clientisUpvoted = this.review.isUpvoted
    this.clientisDownvoted = this.review.isDownvoted
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
