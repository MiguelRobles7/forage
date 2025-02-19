export default {
  props: {
    restaurantName: String,
    restaurantId: Number,
    userId: Number,
    title: String,
    rating: Number,
    body: String,
    images: Array
  },
  data() {
    return {
      formData: {
        restaurantId: this.restaurantId,
        userId: this.userId,
        rating: this.rating,
        title: this.title,
        body: this.body,
        upvotes: 0,
        downvotes: 0,
        isReply: false,
        images: [],
        addedImages: [],
        imageCount: this.images.length,
        hasImage: this.images.length > 0,
        deleted: false
      },
      doneLoading: true,
      rCount: 0,
      avRating: 0,
      timeout: 10000
    }
  },
  methods: {
    closeModal() {
      this.$emit('toggleModal')
    },
    reloadPage() {
      window.location.reload()
    },
    async editReview() {
      this.doneLoading = false
      const supabase = useSupabaseClient()

      const { error } = await supabase
        .from('reviews')
        .update({
          rating: this.formData.rating,
          title: this.formData.title,
          body: this.formData.body,
          upvotes: this.formData.upvotes,
          downvotes: this.formData.downvotes,
          isReply: this.formData.isReply,
          isEdited: true
        })
        .eq('restaurantId', this.formData.restaurantId)
        .eq('userId', this.formData.userId)
        .eq('isReply', false)
        .eq('isDeleted', false)

      if (error) {
        console.log(error)
      } else {
        console.log('Review updated successfully.')
      }

      // Use factory function to handle media updates
      await handleMediaUpdate(this.reviewId, this.formData.addedImages, [], this.formData.deleted)

      setTimeout(() => {
        window.location.reload()
      }, this.timeout)
    },
    async addMedia(e) {
      this.formData.addedImages.push({
        file: e.target.files[0],
        link: URL.createObjectURL(e.target.files[0])
      })
    },
    async deleteImage(e) {
      if (e.target.id.split('-')[0] === 'n') {
        this.formData.addedImages.splice(e.target.id.split('-')[1], 1)
      }
    },
    async deleteAll() {
      this.images.splice(0, this.images.length)
      this.formData.hasImage = false
      this.formData.deleted = true
    }
  }
}
