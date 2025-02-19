import { fetchRestaurant } from '@/factories/restaurantFactory'
import { fetchReviews, fetchUserVotes } from '@/factories/reviewFactory'
import { getUserSession } from '@/factories/userFactory'

export default {
  data() {
    return {
      doneLoading: false,
      isLoggedIn: false,
      id: useRoute().params.id,
      restaurant: {},
      upvotedReviews: [],
      downvotedReviews: [],
      reviews: [],
      reviewed: false
    }
  },
  async mounted() {
    this.restaurant = await fetchRestaurant(this.id)
    this.reviews = await fetchReviews(this.id)
    const user = await getUserSession()

    if (user.isLoggedIn) {
      this.isLoggedIn = true
      const votes = await fetchUserVotes(user.userId)
      this.upvotedReviews = votes.upvotes
      this.downvotedReviews = votes.downvotes
    }
    this.doneLoading = true
  }
}
