export default {
  props: {
    review: Object
  },
  data() {
    return {
      body: '',
      logId: '',
      newComments: [],
      isOwner: false,
      user_real_id: ''
    }
  },
  async mounted() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.logId = userData.profile_id
      this.user_real_id = userData.id
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    async addComment() {
      const supabase = useSupabaseClient()
      let { data: restaurantData, error4 } = await supabase.from('restaurants').select('*')
      if (error4) {
        console.log(error4)
      } else {
        console.log('Success Getting Restaurant Data')
        console.log(restaurantData)
        for (var i = 0; i < restaurantData.length; i++) {
          if (
            restaurantData[i].id == parseInt(this.$route.params.id) &&
            restaurantData[i].owner_id == this.user_real_id
          ) {
            this.isOwner = true
          }
        }
      }

      console.log('Add Comment')
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            restaurantId: this.$route.params.id,
            userId: this.logId,
            rating: 5,
            title: '',
            body: this.body,
            upvotes: 0,
            downvotes: 0,
            isReply: true,
            isDeleted: false,
            isEdited: false,
            images: [],
            comments: [],
            videos: [],
            ownerResponded: this.isOwner
          }
        ])
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success')
        console.log('Data', data)
      }

      let { data: reviews, err } = await supabase.from('reviews').select()

      if (err) {
        console.log(err)
      } else {
        console.log('reviews', reviews)
        console.log('Success Getting Comment Chain')

        for (var i = 0; i < reviews.length; i++) {
          if (reviews[i].id == this.review.id) {
            console.log('Found', reviews[i])
            for (var j = 0; j < reviews[i].comments.length; j++) {
              this.newComments.push(reviews[i].comments[j])
              console.log('Adding to Array' + reviews[i].comments[j])
            }
            this.newComments.push(data[0].id)
          }
        }
        console.log(this.newComments)
        console.log(data[0].id)
      }
      if (this.isOwner == true) {
        const { data3, error3 } = await supabase
          .from('reviews')
          .update({ comments: this.newComments, ownerResponded: true })
          .eq('id', this.review.id)
          .select()
        if (error3) {
          console.log(error3)
        } else {
          console.log('Success Adding to Comment Chain')
          console.log(data3)
        }
      } else {
        const { data3, error3 } = await supabase
          .from('reviews')
          .update({ comments: this.newComments })
          .eq('id', this.review.id)
          .select()
        if (error3) {
          console.log(error3)
        } else {
          console.log('Success Adding to Comment Chain')
          console.log(data3)
        }
      }
      this.reloadPage()
    }
  }
}
