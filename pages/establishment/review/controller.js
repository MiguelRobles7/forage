export default {
  props: {
    restaurant: {
      type: Object,
      required: true
    }
  },
  methods: {
    edit: function () {
      this.modal = true
    },
    async getUserID() {
      const supabase = useSupabaseClient()
      try {
        const { data, error } = await supabase.auth.getSession()
        this.uid = data.session.user.id
        console.log(uid)
        if (error) throw error
      } catch (error) {
        console.log(error)
      }

      try {
        const { data, error } = await supabase.from('profiles').select('profile_id').eq('id', uid)
        if (error) {
          throw error
        } else {
          this.userID = data[0].profile_id
        }
      } catch (error) {
        console.log(error)
      }
    }
  },

  data() {
    return {
      doneLoading: false,
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
      userID: null,
      uid: null,
      reviews: [],
      restaurantNames: [],
      restaurantComments: [],
      reviewed: false
    }
  },

  async mounted() {
    const supabase = useSupabaseClient()
    this.getUserID()

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
      console.log('Reviewed data: ' + data)
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

    let { data: rv, error } = await supabase.from('reviews').select()
    if (error) {
      console.log(error)
    } else {
      console.log('Got Reviews')
      console.log(rv)
    }

    for (var i = 0; i < rv.length; i++) {
      if (rv[i].restaurantId == this.$route.params.id && rv[i].isReply == false) {
        let { data: restoName, error } = await supabase.from('restaurants').select('name').eq('id', rv[i].restaurantId)
        if (error) {
          console.log(error)
        } else {
          console.log("Got Restaurant's Name")
        }
        let { data: restoUser, e } = await supabase.from('profiles').select().eq('profile_id', rv[i].userId)
        if (e) {
          console.log(e)
        } else {
          console.log('Got Restaurant User')
        }

        let rev = {
          id: parseInt(rv[i].id),
          restaurantId: rv[i].restaurantId,
          userId: rv[i].userId,
          title: rv[i].title,
          body: rv[i].body,
          rating: rv[i].rating,
          upvotes: rv[i].upvotes,
          downvotes: rv[i].downvotes,
          isEdited: rv[i].is_edited,
          isReply: rv[i].is_reply,
          isDeleted: rv[i].is_deleted,
          images: rv[i].images,
          comments: rv[i].comments,
          ownerResponded: rv[i].ownerResponded,

          userImage: restoUser[0].displayPicture,
          userName: restoUser[0].name
        }
        rev['restaurantComments'] = []
        for (var j = 0; j < rv.length; j++) {
          if (rv[j].isReply == true && rv[i].comments.includes(rv[j].id)) {
            let { data: ru, e } = await supabase.from('profiles').select().eq('profile_id', rv[j].userId)

            let subComment = {
              body: rv[j].body,
              upvotes: rv[j].upvotes,
              downvotes: rv[j].downvotes,

              userImage: ru[0].displayPicture,
              userName: ru[0].name
            }
            rev['restaurantComments'].push(subComment)
            console.log('Got Restaurant Comments', rv[j])
          }
        }
        rev['restaurantName'] = restoName[0].name
        this.reviews.push(rev)
      }
    }
    console.log(this.reviews)

    this.doneLoading = true
  }
}
