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
      if (!this.isLoggedIn || this.isUpvoted || this.clientisUpvoted) {
        console.log('Upvote discontinued')
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
  }
}
