export default {
  data() {
    return {
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean
    }
  },
  props: {
    isUpvoted: Boolean,
    loggedUserID: String,
    reviewID: Number,
    restaurantID: Number,
    isLoggedIn: Boolean,
    ownerReply: Array,
    userImg: String,
    userName: String,
    userID: Number,
    title: String,
    content: String,
    stars: Number,
    upvotes: Number,
    downvotes: Number,
    isEdited: Boolean,
    images: Array,
    comments: Array,
    owner_responded: Boolean,
    owner_image: String
  },
  mounted() {
    this.clientUpvotes = this.upvotes
    this.clientDownvotes = this.downvotes
    this.clientisUpvoted = this.isUpvoted
  },
  methods: {
    async triggerUpvote() {
      if (!this.isLoggedIn) { 
        console.log('Upvote discontinued')
        return
      }
      else if (this.isUpvoted || this.clientisUpvoted) {
        this.revokeUpvote()
        return
      }
      const upvotes = this.upvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID,
      }

      await useFetch('/api/reviews/update_upvotes/', {
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

      await useFetch('/api/reviews/revoke_upvote/', {
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
  }
}
