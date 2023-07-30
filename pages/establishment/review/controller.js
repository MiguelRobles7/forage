export default {
  methods: {
    edit: function () {
      this.modal = true
    },
    isReviewUpvoted(review) {
      for (var i = 0; i < this.upvotedReviews.length; i++) {
        if (this.upvotedReviews[i].reviewID === review.id) {
          return true
        }
      }
      return false
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
        bgCard: String,
        description: String,
        tags: String,
        rating: Number,
        reviewCount: Number,
        price_range: String
      },

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

    const restaurantFetch = useFetch(`/api/restaurants/${useRoute().params.id}`, { immediate: false })
    await restaurantFetch.execute({ _initial: true })
    const restaurantData = restaurantFetch.data.value.restaurants[0]
    this.restaurant.bgCard = restaurantData.banner
    this.restaurant.price_range = restaurantData.price_range
    this.restaurant.logo = restaurantData.logo
    this.restaurant.name = restaurantData.name
    this.restaurant.description = restaurantData.description
    this.restaurant.tags = restaurantData.summary
    this.restaurant.rating = restaurantData.rating
    this.restaurant.reviewCount = restaurantData.reviewCount

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (user === null) {
        this.isLoggedIn = false
        console.log('User is not logged in')
        this.reviewed = true
      }
    } catch (error) {
      console.log(error)
    }

    try {
      console.log('Getting reviews from user id ' + this.userID)
      const { data, error } = await supabase
        .from('reviews')
        .select()
        .eq('restaurantId', this.$route.params.id)
        .eq('userId', this.userID)
        .eq('isReply', false)
        .eq('isDeleted', false)
      console.log('Reviewed data: ', data)
      if (error) {
        throw error
      }
      if (data.length > 0) {
        this.reviewed = true
      }
    } catch (error) {
      console.log(error)
    }

    try {
      const { data, error } = await supabase.from('restaurants').select('owner_id').eq('id', this.$route.params.id)
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
    console.log('upvoted stuff:', this.upvotedReviews)

    let { data: reviews, reviewsError } = await supabase.from('reviews').select()
    if (reviewsError) {
      console.log(reviewsError)
    } else {
      console.log('Got Reviews')
      console.log(reviews)
    }
    let { data: thisResto, restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', this.$route.params.id)
    if (restaurantError) {
      console.log(restaurantError)
    } else {
      console.log("Got Restaurant's Name")
    }

    // Get owner
    let { data: owner, ownerErr } = await supabase.from('profiles').select('*').eq('id', thisResto[0].owner_id)
    if (ownerErr) {
      console.log(ownerErr)
    } else {
      console.log('Got Owner')
    }

    for (var i = 0; i < reviews.length; i++) {
      if (
        reviews[i].restaurantId == this.$route.params.id &&
        reviews[i].isReply == false &&
        reviews[i].isDeleted == false
      ) {
        let { data: restoUser, e } = await supabase.from('profiles').select().eq('profile_id', reviews[i].userId)
        if (e) {
          console.log(e)
        } else {
          console.log('Got Restaurant User')
        }

        let rev = {
          id: parseInt(reviews[i].id),
          restaurantId: reviews[i].restaurantId,
          userId: reviews[i].userId,
          title: reviews[i].title,
          body: reviews[i].body,
          isUpvoted: false,
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
            console.log('Got Restaurant Comments', reviews[j])
          }
        }
        rev['restaurantName'] = thisResto[0].name
        this.reviews.push(rev)
      }
    }
    this.doneLoading = true
  }
}
