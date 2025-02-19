import { createVoteHandler } from '@/factories/voteFactory'

const upvoteHandler = createVoteHandler('Upvote')
const downvoteHandler = createVoteHandler('Downvote')

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
  }
}
