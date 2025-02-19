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
    const user = await getUserSession()
    this.isLoggedIn = user.isLoggedIn
    this.newId = user.profileId
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    closeModal() {
      this.$emit('toggleModal')
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
      const newComment = await addComment(this.$route.params.id, this.logId, this.body, this.isOwner)

      if (error) {
        console.log(error)
      } else {
        console.log('Success')
        console.log('Data', newComment)
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
