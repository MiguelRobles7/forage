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
    reloadPage() {
      window.location.reload()
    },
    async deleteOldImages() {
      const supabase = useSupabaseClient()

      // get reviewId of review
      let reviewId = null
      try {
        console.log(this.restaurantId)
        console.log(this.userId)
        const { data, error } = await supabase
          .from('reviews')
          .select('id')
          .eq('restaurantId', this.restaurantId)
          .eq('userId', this.userId)
          .eq('isDeleted', false)
          .limit(1)
        if (error) throw error
        else {
          reviewId = data[0].id
          console.log(reviewId)
        }
      } catch (error) {
        console.log(error)
      }

      // delete old images
      if (this.formData.deleted) {
        try {
          for (let i = 0; i < this.formData.imageCount; i++) {
            const { data, error } = await supabase.storage.from('reviews').remove([`${reviewId}/${i}.png`])
            if (error) throw error
            else {
              console.log('Deleted images!')
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      // upload new images
      try {
        if (this.formData.addedImages.length > 0) {
          for (let i = 0; i < this.formData.addedImages.length; i++) {
            const { data, error } = await supabase.storage
              .from('reviews')
              .upload(`${reviewId}/${i}.png`, this.formData.addedImages[i].file, {
                cacheControl: '0',
                upsert: true
              })
            if (error) throw error
            else {
              console.log('Added image!')
            }
          }
        }
      } catch (error) {
        console.log(error)
      }

      // update review links
      if (this.formData.deleted) {
        if (this.formData.addedImages.length > 0) {
          for (let i = 0; i < this.formData.addedImages.length; i++) {
            this.formData.images.push(
              `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/reviews/${reviewId}/${i}.png`
            )
          }
        }
  
        try {
          const { data, error } = await supabase
            .from('reviews')
            .update({
              images: this.formData.images
            })
            .eq('id', reviewId)
          if (error) throw error
          else {
            console.log('Updated review links!')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    async editReview() {
      this.doneLoading = false
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
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
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success!')
        console.log(data)

        // Update Ratings and Comment Count
        const restaurantsFetch = useFetch('/api/restaurants/', { immediate: false })
        await restaurantsFetch.execute({ _initial: true })
        let restos = restaurantsFetch.data.value.restaurants
        for (let i = 0; i < restos.length; i++) {
          if (restos[i].id == this.restaurantId) {
            let { data: reviewQuery, reviewError } = await supabase
              .from('reviews')
              .select('*')
              .eq('restaurantId', restos[i].id)
            for (let j = 0; j < reviewQuery.length; j++) {
              if (!reviewQuery[j].isDeleted && !reviewQuery[j].isReply) {
                this.rCount++
                this.avRating += reviewQuery[j].rating
              }
            }
          }
        }

        this.avRating = Math.round((this.avRating / this.rCount) * 10) / 10
        let { data: rst, error2 } = await supabase
          .from('restaurants')
          .update({
            reviewCount: this.rCount,
            rating: this.avRating
          })
          .eq('id', this.restaurantId)
          .select()

        if (error2) {
          console.log(error2)
        } else {
          console.log(rst)
        }
        console.log('Updated Table')
      }
      this.deleteOldImages()
      setTimeout(function () {
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
