import { getPublicUserProfile, getUserSession } from '@/factories/userFactory'
import { fetchReviews } from '@/factories/reviewFactory'
import { fetchRestaurant } from '@/factories/restaurantFactory'

export default {
  data() {
    return {
      id: useRoute().params.id,
      profile: {},
      reviews: [],
      reviewRestaurants: [],
      establishments: [],
      doneLoading: false
    }
  },
  async mounted() {
    this.profile = await getPublicUserProfile(this.id)
    this.reviews = await fetchReviews(this.id)
    const restaurants = await fetchRestaurant()

    this.reviewRestaurants = restaurants.filter((r) => this.reviews.some((review) => review.restaurantId === r.id))

    this.establishments = restaurants.filter((r) => r.owner_id === this.profile.id)
    this.doneLoading = true
  }
}
