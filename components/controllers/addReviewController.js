export default {
  props: {
    restaurant: String,
    restaurantId: Number,
    userId: Number
  },
  data() {
    return {
      formData: {
        restaurantId: this.restaurantId,
        userId: this.userId,
        rating: 5,
        title: '',
        body: '',
        upvotes: 0,
        downvotes: 0,
        isReply: false,
        imageCount: 0,
        images: [],
        videos: [],
        videoCount: 0
      },
      doneLoading: true,
      newId: null,
      rCount: 0,
      avRating: 0
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
      this.newId = userData.profile_id
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },
    async uploadMedia() {
      const supabase = useSupabaseClient()

      // get id of latest review
      let reviewId = null
      try {
        const { data, error } = await supabase.from('reviews').select('id').order('id', { ascending: false }).limit(1)
        if (error) throw error
        else {
          reviewId = data[0].id
          console.log(reviewId)
        }
      } catch (error) {
        console.log(error)
      }

      // upload images
      try {
        for (let i = 0; i < this.formData.imageCount; i++) {
          const element = this.formData.images[i]
          const { data, error } = supabase.storage.from('reviews').upload(`${reviewId}/${i}.png`, element.file, {
            cacheControl: '0'
          })
          if (error) throw error
          else {
            console.log('Uploaded image!')
          }
        }
      } catch (error) {
        console.log(error)
      }
      // upload videos
      try {
        for (let i = 0; i < this.formData.videoCount; i++) {
          const element = this.formData.videos[i]
          const { data, error } = supabase.storage.from('reviews').upload(`${reviewId}/${i}.mp4`, element.file, {
            cacheControl: ' 0'
          })
          if (error) throw error
          else {
            console.log('Uploaded video!')
          }
        }
      } catch (error) {
        console.log(error)
      }

      // update review images
      try {
        var imageLinks = []
        for (let i = 0; i < this.formData.imageCount; i++) {
          imageLinks.push(
            `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/reviews/${reviewId}/${i}.png`
          )
        }
        console.log(imageLinks)
        const { data, error } = await supabase.from('reviews').update({ images: imageLinks }).eq('id', reviewId)
        if (error) throw error
        else {
          console.log('Updated review images!')
        }
      } catch (error) {
        console.log(error)
      }
      // update review videos
      try {
        var videoLinks = []
        for (let i = 0; i < this.formData.videoCount; i++) {
          videoLinks.push(
            `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/reviews/${reviewId}/${i}.mp4`
          )
        }
        const { data, error } = await supabase.from('reviews').update({ videos: videoLinks }).eq('id', reviewId)
        if (error) throw error
        else {
          console.log('Updated review videos!')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async addReview() {
      console.log(this.formData)
      const supabase = useSupabaseClient()
      try {
        const { data, error } = await supabase
          .from('reviews')
          .insert([
            {
              restaurantId: this.formData.restaurantId,
              userId: this.newId,
              rating: this.formData.rating,
              title: this.formData.title,
              body: this.formData.body,
              upvotes: 0,
              downvotes: 0,
              isReply: false,
              isDeleted: false,
              isEdited: false,
              images: [],
              comments: [],
              videos: []
            }
          ])
          .select()
        if (error) throw error
        else {
          console.log('Added review!')
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
          if (this.formData.imageCount + this.formData.videoCount > 0) this.uploadMedia()
        }
      } catch (error) {
        console.log(error)
      }
      this.doneLoading = false
      setTimeout(function () {
        window.location.reload()
      }, 8000)
    },
    addMedia(e) {
      if (e.target.files[0].type.split('/')[0] === 'image') {
        this.formData.images.push({
          file: e.target.files[0],
          link: URL.createObjectURL(e.target.files[0])
        })
        this.formData.imageCount++
      } else {
        this.formData.videos.push({
          file: e.target.files[0],
          link: URL.createObjectURL(e.target.files[0])
        })
        this.formData.videoCount++
      }
    },
    removeMedia(e) {
      const id = e.target.id
      if (e.target.tagName === 'VIDEO') {
        this.formData.videos.splice(id, 1)
        this.formData.videoCount--
      } else {
        this.formData.images.splice(id, 1)
        this.formData.imageCount--
      }
    }
  }
}
