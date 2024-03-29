export default {
  data() {
    return {
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean,
      clientisDownvoted: Boolean,
      clicked: false
    }
  },
  props: {
    isUpvoted: Boolean,
    isDownvoted: Boolean,
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
    this.clientisDownvoted = this.isDownvoted
  },
  methods: {
    async triggerDownvote() {
      if (!this.isLoggedIn || this.clicked) {
        console.log('Downvote discontinued')
        return
      } else if (this.isUpvoted || this.clientisUpvoted) {
        this.revokeUpvote()
      } else if (this.isDownvoted || this.clientisDownvoted) {
        this.revokeDownvote()
        return
      }
      this.clicked = true
      const downvotes = this.clientDownvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: downvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      await useFetch('/api/reviews/downvotes/update/', {
        method: 'POST',
        body: data
      })
      await useFetch('/api/user_downvotes/new/', {
        method: 'POST',
        body: data
      })

      await refreshNuxtData()
      this.clientDownvotes = this.clientDownvotes + 1
      this.clientisDownvoted = true
      setTimeout(() => {
        this.clicked = false
      }, 5000)
    },
    async revokeDownvote() {
      this.clicked = true
      const downvotes = this.clientDownvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: downvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      const resRevoke = await useFetch('/api/reviews/downvotes/revoke/', {
        method: 'POST',
        body: data
      })

      const resDelete = await useFetch('/api/user_downvotes/delete/', {
        method: 'POST',
        body: data
      })

      await refreshNuxtData()
      if (this.clientDownvotes > 0) {
        this.clientDownvotes = this.clientDownvotes - 1
      }
      this.clientisDownvoted = false

      setTimeout(() => {
        this.clicked = false
      }, 5000)
    },
    async triggerUpvote() {
      if (!this.isLoggedIn || this.clicked) {
        console.log('Upvote discontinued')
        return
      } else if (this.isDownvoted || this.clientisDownvoted) {
        this.revokeDownvote()
      } else if (this.isUpvoted || this.clientisUpvoted) {
        this.revokeUpvote()
        return
      }
      this.clicked = true
      const upvotes = this.clientUpvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      const resUpdate = await useFetch('/api/reviews/upvotes/update/', {
        method: 'POST',
        body: data
      })
      const resNew = await useFetch('/api/user_upvotes/new/', {
        method: 'POST',
        body: data
      })

      await refreshNuxtData()
      this.clientUpvotes = this.clientUpvotes + 1
      this.clientisUpvoted = true
      setTimeout(() => {
        this.clicked = false
      }, 5000)
    },
    async revokeUpvote() {
      this.clicked = true
      const upvotes = this.clientUpvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      const resRevoke = await useFetch('/api/reviews/upvotes/revoke/', {
        method: 'POST',
        body: data
      })
      const resDelete = await useFetch('/api/user_upvotes/delete/', {
        method: 'POST',
        body: data
      })

      await refreshNuxtData()
      if (this.clientUpvotes > 0) {
        this.clientUpvotes = this.clientUpvotes - 1
      }
      this.clientisUpvoted = false
      setTimeout(() => {
        this.clicked = false
      }, 5000)
    }
  }
}
