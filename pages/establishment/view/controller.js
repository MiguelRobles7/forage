import { fetchRestaurant, fetchMenu } from '@/factories/restaurantFactory'
import { fetchReviews, fetchUserVotes } from '@/factories/reviewFactory'
import { getUserSession } from '@/factories/userFactory'

export default {
  data() {
    return {
      restaurant: {},
      menu: [],
      reviews: [],
      isLoggedIn: false,
      loggedUserID: null,
      upvotedReviews: [],
      downvotedReviews: [],
      doneLoading: false
    }
  },
  async mounted() {
    this.restaurant = await fetchRestaurant(useRoute().params.id)
    this.menu = await fetchMenu(useRoute().params.id)
    this.reviews = await fetchReviews(useRoute().params.id)
    const user = await getUserSession()

    if (user.isLoggedIn) {
      this.isLoggedIn = true
      this.loggedUserID = user.userId
      const votes = await fetchUserVotes(user.userId)
      this.upvotedReviews = votes.upvotes
      this.downvotedReviews = votes.downvotes
    }
    this.doneLoading = true
  }
}
