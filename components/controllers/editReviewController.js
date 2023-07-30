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
        deletedImageIndex: [],
        addedImages: [],
        imageCount: this.images.length,
        originalCount: this.images.length
      },
      doneLoading: true
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
      try {
        for (let index in this.formData.deletedImageIndex) {
          const { data, error } = await supabase.storage.from('reviews').remove([`${reviewId}/${index}.png`])
          if (error) throw error
          else {
            console.log('Deleted images!')
          }
        }
      } catch (error) {
        console.log(error)
      }

      // get max index of existing images
      let maxOld = 0
      for (let i = 0; i < this.images.length; i++) {
        let index = this.images[i].split(`/reviews/${reviewId}/`)[1].split('.png')[0]
        if (index > maxOld) maxOld = index
      }

      // upload new images
      try {
        if (this.formData.addedImages.length > 0) {
          // use index of old deleted images as new image index
          if (this.formData.addedImages.length >= this.formData.deletedImageIndex.length) {
            for (let i = 0; i < this.formData.deletedImageIndex.length; i++) {
              const { data, error } = await supabase.storage
                .from('reviews')
                .upload(`${reviewId}/${this.formData.deletedImageIndex[i]}.png`, this.formData.addedImages[i].file, {
                  cacheControl: '0',
                  upsert: true
                })
              if (error) throw error
              else {
                console.log('Replaced image!')
              }
              this.formData.addedImages.splice(0, 1)
            }
            // get max index of deleted images
            var maxDel = 0
            for (let index in this.formData.deletedImageIndex) {
              if (index > maxDel) maxDel = index
            }
            let max = Math.max(maxDel, maxOld)
            if (this.formData.originalCount >= 1) max++
            console.log('Max: ' + max)
            // add new images
            for (let i = 0; i < this.formData.addedImages.length; i++) {
              const { data, error } = await supabase.storage
                .from('reviews')
                .upload(`${reviewId}/${max + i}.png`, this.formData.addedImages[i].file, {
                  cacheControl: '0',
                  upsert: true
                })
              if (error) throw error
              else {
                console.log('Added image!')
              }
            }
          }
          // if uploaded images are less than deleted images
          else {
            let newImageIndex = 0
            let imageIndex = 0
            for (let i = 0; i < this.formData.deletedImageIndex.length; i++) {
              if (this.formData.addedImages.length > 0) {
                // use deleted index for new images
                const { data, error } = await supabase.storage
                  .from('reviews')
                  .upload(
                    `${reviewId}/${this.formData.deletedImageIndex[i]}.png`,
                    this.formData.addedImages[newImageIndex].file,
                    {
                      cacheControl: '0',
                      upsert: true
                    }
                  )
                if (error) throw error
                else {
                  console.log('Replaced image!')
                  newImageIndex++
                  this.formData.addedImages.splice(0, 1)
                }
              } else if (this.images.length > 0) {
                // get index of old image > deleted image index
                var newIndex = 0
                for (let j = 0; j < this.images.length; j++) {
                  var index = this.images[j].split(`/reviews/${reviewId}/`)[1].split('.png')[0]
                  if (index > this.formData.deletedImageIndex[i]) {
                    newIndex = j - 1
                    this.images.splice(j, 1)
                    break
                  }
                  const { data, error } = await supabase.storage
                    .from('reviews')
                    .move(`${reviewId}/${index}.png`, `${reviewId}/${newIndex}.png`)
                  if (error) throw error
                  else {
                    console.log('Moved image!')
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error)
      }

      // update review links
      for (let i = 0; i < this.formData.imageCount; i++) {
        this.formData.images.push(
          `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/reviews/${reviewId}/${i}.png`
        )
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
    },
    async editReview() {
      console.log(this.formData)
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
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success!')
        console.log(data)
      }
      this.deleteOldImages()
      this.doneLoading = false
      setTimeout(function () {
        window.location.reload()
      }, 8000)
    },
    async addMedia(e) {
      this.formData.addedImages.push({
        file: e.target.files[0],
        link: URL.createObjectURL(e.target.files[0])
      })
      this.formData.imageCount++
    },
    async deleteImage(e) {
      if (e.target.id.split('-')[0] === 'n') {
        this.formData.addedImages.splice(e.target.id.split('-')[1], 1)
        this.formData.imageCount--
      } else {
        this.formData.deletedImageIndex.push(e.target.id)
        this.images.splice(e.target.id, 1)
        this.formData.imageCount--
      }
    }
  }
}
