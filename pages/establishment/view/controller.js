export default {
  data() {
    return {
      addresses: ['Menu', 'Top Reviews'],
      addresses_links: ['#menu', '#reviews'],
      upvotedReviews: [],
      downvotedReviews: [],
      id: useRoute().params.id,
      modal: false,
      reviews_holder: [[], [], []],
      menu: [],
      restaurant: {
        loggedUserID: String,
        backgroundImg: String,
        logo: String,
        name: String,
        desc: String,
        tags: Array,
        location: String,
        openingTime: String,
        closingTime: String,
        rating: Number,
        reviewCount: Number
      },
      doneLoading: false,
      isLoggedIn: false
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    let { data: rv, error } = await supabase.from('reviews').select()

    if (error) {
      console.log(error)
    }
  },

  async mounted() {
    const restaurantFetch = useFetch(`/api/restaurants/${useRoute().params.id}`, { immediate: false })
    await restaurantFetch.execute({ _initial: true })
    const restaurantData = restaurantFetch.data.value.restaurants[0]
    this.restaurant.backgroundImg = restaurantData.banner
    this.restaurant.price_range = restaurantData.price_range
    this.restaurant.logo = restaurantData.logo
    this.restaurant.name = restaurantData.name
    this.restaurant.desc = restaurantData.description
    this.restaurant.tags = restaurantData.tags
    this.restaurant.location = restaurantData.location
    this.restaurant.openingTime = restaurantData.openingTime.slice(0, -3)
    this.restaurant.closingTime = restaurantData.closingTime.slice(0, -3)
    this.restaurant.rating = restaurantData.rating
    this.restaurant.reviewCount = restaurantData.reviewCount

    const menuFetch = useFetch(`/api/menu/${useRoute().params.id}`, { immediate: false })
    await menuFetch.execute({ _initial: true })

    const menuData = menuFetch.data.value.menu_items
    this.menu = menuData

    const reviewFetch = useFetch(`/api/reviews/restaurant/${useRoute().params.id}`, { immediate: false })
    await reviewFetch.execute({ _initial: true })
    const reviewData = reviewFetch.data.value.reviews

    var c = 0

    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
      this.loggedUserID = null
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.loggedUserID = userData.id

      const userUpvotesFetch = useFetch(`/api/user_upvotes/${this.loggedUserID}`, { immediate: false, method: 'GET' })
      await userUpvotesFetch.execute({ _initial: true })
      const userUpvotesData = userUpvotesFetch.data.value.user_upvotes

      this.upvotedReviews = userUpvotesData

      const userDownvotesFetch = useFetch(`/api/user_downvotes/${this.loggedUserID}`, { immediate: false, method: 'GET' })
      await userDownvotesFetch.execute({ _initial: true })
      const userDownvotesData = userDownvotesFetch.data.value.user_downvotes

      this.downvotedReviews = userDownvotesData
    }

    for (var i = 0; i < reviewData.length; i++) {
      const userFetch = useFetch(`/api/users/public/${reviewData[i].userId}`, { immediate: false })
      await userFetch.execute({ _initial: true })
      const userData = userFetch.data.value.users[0]
      const review = {
        review_id: reviewData[i].id,
        user_image: userData.displayPicture,
        userID: userData.profile_id,
        user_name: userData.name,
        title: reviewData[i].title,
        body: reviewData[i].body,
        rating: reviewData[i].rating,
        upvotes: reviewData[i].upvotes,
        isUpvoted: false,
        isDownvoted: false,
        downvotes: reviewData[i].downvotes,
        isEdited: reviewData[i].isEdited,
        images: reviewData[i].images,
        isDeleted: reviewData[i].isDeleted,
        comments: reviewData[i].comments
      }
      if (this.isReviewUpvoted(review)) {
        review.isUpvoted = true
      }
      else if (this.isReviewDownvoted(review)) {
        review.isDownvoted = true
      } 
      if (!reviewData[i].isReply && !reviewData[i].isDeleted) {
        this.reviews_holder[c].push(review)
        if (c === 2) {
          c = 0
        } else {
          c += 1
        }
      }
    }

    this.doneLoading = true
  },

  computed: {
    menu_items() {
      return this.menu
    },

    current_reviews() {
      return this.reviews.filter((review) => {
        return review.restaurant_id === Number(1)
      })
    }
  },
  methods: {
    edit: function () {
      this.modal = true
    },

    isReviewUpvoted(review) {
      for (var i = 0; i < this.upvotedReviews.length; i++) {
        if (this.upvotedReviews[i].reviewID === review.review_id) {
          return true
        }
      }
      return false
    },
    isReviewDownvoted(review) {
      for (var i = 0; i < this.downvotedReviews.length; i++) {
        if (this.downvotedReviews[i].reviewID === review.review_id) {
          return true
        }
      }
      return false
    }
  }
}
