export default {
  methods: {
    searchClick() {
      // Redirect to search page with criteria
      if (this.searchCriteria === '' || this.searchCriteria === null || this.searchCriteria === undefined) {
        this.$router.push('/establishment/review/' + this.$route.params.id.split('searchQuery=')[0])
      } else {
        this.$router.push(
          '/establishment/review/' +
            this.$route.params.id.split('searchQuery=')[0] +
            'searchQuery=' +
            this.searchCriteria
        )
      }
    },
    isReviewUpvoted(review) {
      for (var i = 0; i < this.upvotedReviews.length; i++) {
        if (this.upvotedReviews[i].reviewID === review.id) {
          return true
        }
      }
      return false
    },
    isReviewDownvoted(review) {
      for (var i = 0; i < this.downvotedReviews.length; i++) {
        if (this.downvotedReviews[i].reviewID === review.id) {
          return true
        }
      }
      return false
    },
    toggleModal() {
      this.modal = !this.modal
    }
  },

  data() {
    return {
      doneLoading: false,
      isLoggedIn: true,
      id: useRoute().params.id,
      restaurant: {
        name: String,
        logo: String,
        description: String,
        tags: Array,
        rating: Number,
        reviewCount: Number,
        price_range: String
      },
      upvotedReviews: [],
      downvotedReviews: [],
      modal: false,
      userID: '',
      uid: null,
      reviews: [],
      restaurantNames: [],
      restaurantComments: [],
      reviewed: false,
      ownerId: null
    }
  },
  async mounted() {
    let curr_id = this.$route.params.id.split('searchQuery=')[0]
    console.log('Current ID: ', curr_id)
    let searchQuery = this.$route.params.id.split('searchQuery=').slice(1).toString()
    console.log('Search Query: ', searchQuery)

    const supabase = useSupabaseClient()
    try {
      const { data, error } = await supabase.auth.getSession()
      this.uid = data.session.user.id
      if (error) throw error
    } catch (error) {
      console.log(error)
    }

    try {
      const { data, error } = await supabase.from('profiles').select('profile_id').eq('id', this.uid)
      if (error) {
        throw error
      } else {
        this.userID = data[0].profile_id
      }
    } catch (error) {
      console.log('ID ERROR', error)
    }

    const restaurantFetch = useFetch(`/api/restaurants/${curr_id}`, { immediate: false })
    await restaurantFetch.execute({ _initial: true })
    const restaurantData = restaurantFetch.data.value.restaurants[0]
    this.restaurant.bgCard = restaurantData.banner
    this.restaurant.price_range = restaurantData.price_range
    this.restaurant.logo = restaurantData.logo
    this.restaurant.name = restaurantData.name
    this.restaurant.description = restaurantData.description
    this.restaurant.tags = restaurantData.tags
    this.restaurant.rating = restaurantData.rating
    this.restaurant.reviewCount = restaurantData.reviewCount

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user === null) {
        this.isLoggedIn = false
        this.reviewed = true
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const { data, error } = await supabase.from('restaurants').select('owner_id').eq('id', curr_id)
      if (error) {
        throw error
      }
      if (data[0].owner_id == this.uid) {
        this.reviewed = true
      }
    } catch (error) {
      console.log(error)
    }

    var userUpvotesData = []
    if (this.isLoggedIn) {
      const userUpvotesFetch = useFetch(`/api/user_upvotes/${this.uid}`, { immediate: false, method: 'GET' })
      await userUpvotesFetch.execute({ _initial: true })
      userUpvotesData = userUpvotesFetch.data.value.user_upvotes
    }
    this.upvotedReviews = userUpvotesData

    const userDownvotesFetch = useFetch(`/api/user_downvotes/${this.uid}`, { immediate: false, method: 'GET' })
    await userDownvotesFetch.execute({ _initial: true })
    const userDownvotesData = userDownvotesFetch.data.value.user_downvotes

    this.downvotedReviews = userDownvotesData

    let { data: reviews, reviewsError } = await supabase
      .from('reviews')
      .select()
      .eq('restaurantId', curr_id)
      .eq('isReply', false)
      .eq('isDeleted', false)
    if (reviewsError) {
      console.log(reviewsError)
    }
    let { data: thisResto, restaurantError } = await supabase.from('restaurants').select('*').eq('id', curr_id)
    if (restaurantError) {
      console.log(restaurantError)
    }

    // Get owner
    let { data: owner, ownerErr } = await supabase.from('profiles').select('*').eq('id', thisResto[0].owner_id)
    if (ownerErr) {
      console.log(ownerErr)
    }

    for (var i = 0; i < reviews.length; i++) {
      if (reviews[i].restaurantId == curr_id && reviews[i].isReply == false && reviews[i].isDeleted == false) {
        let { data: restoUser, e } = await supabase.from('profiles').select().eq('profile_id', reviews[i].userId)
        if (e) {
          console.log(e)
        }
        if (this.userID == reviews[i].userId) {
          this.reviewed = true
        }
        let rev = {
          id: parseInt(reviews[i].id),
          restaurantId: reviews[i].restaurantId,
          userId: reviews[i].userId,
          title: reviews[i].title,
          body: reviews[i].body,
          isUpvoted: false,
          isDownvoted: false,
          rating: reviews[i].rating,
          upvotes: reviews[i].upvotes,
          downvotes: reviews[i].downvotes,
          isEdited: reviews[i].is_edited,
          isReply: reviews[i].is_reply,
          isDeleted: reviews[i].is_deleted,
          images: reviews[i].images,
          comments: reviews[i].comments,
          ownerResponded: reviews[i].ownerResponded,

          userImage: restoUser[0].displayPicture,
          userName: restoUser[0].name
        }

        if (this.isReviewUpvoted(rev)) {
          rev.isUpvoted = true
        } else if (this.isReviewDownvoted(rev)) {
          rev.isDownvoted = true
        }
        rev['restaurantComments'] = []

        for (var j = 0; j < reviews.length; j++) {
          if (reviews[j].isReply == true && reviews[i].comments.includes(reviews[j].id)) {
            let { data: reviewUser, e } = await supabase.from('profiles').select().eq('profile_id', reviews[j].userId)

            if (reviews[i].ownerResponded && reviews[j].userId == owner[0].profile_id) {
              let subComment = {
                userId: reviews[j].userId,
                body: reviews[j].body,
                upvotes: reviews[j].upvotes,
                downvotes: reviews[j].downvotes,

                userImage: thisResto[0].logo,
                userName: thisResto[0].name
              }
              rev['restaurantComments'].push(subComment)
            } else {
              let subComment = {
                userId: reviews[j].userId,
                body: reviews[j].body,
                upvotes: reviews[j].upvotes,
                downvotes: reviews[j].downvotes,

                userImage: reviewUser[0].displayPicture,
                userName: reviewUser[0].name
              }
              rev['restaurantComments'].push(subComment)
            }
          }
        }

        rev['restaurantName'] = thisResto[0].name
        if (searchQuery.length > 0) {
          if (rev['title'].toLowerCase().includes(searchQuery.toLowerCase())) {
            this.reviews.push(rev)
          }
        } else {
          this.reviews.push(rev)
        }
      }
    }
    this.doneLoading = true
  }
}
