<script>
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
      newId: null
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
          if (this.formData.imageCount + this.formData.videoCount > 0) this.uploadMedia()
        }
      } catch (error) {
        console.log(error)
      }
      this.doneLoading = false
      setTimeout(function () {
        window.location.reload()
      }, 5000)
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
</script>

<template>
  <main>
    <div class="review-modal modal" id="add-modal">
      <Loading v-if="!doneLoading"></Loading>
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Write a review for {{ restaurant }}</span>
          <!-- TODO: MCO3 Turn into radio button -->
          <div class="stars">
            <input class="star-rating" id="star_rate_5" type="radio" value="5" v-model="formData.rating" />
            <label for="star_rate_5">★</label>

            <input class="star-rating" id="star_rate_4" type="radio" value="4" v-model="formData.rating" />
            <label for="star_rate_4">★</label>

            <input class="star-rating" id="star_rate_3" type="radio" value="3" v-model="formData.rating" />
            <label for="star_rate_3">★</label>

            <input class="star-rating" id="star_rate_2" type="radio" value="2" v-model="formData.rating" />
            <label for="star_rate_2">★</label>

            <input class="star-rating" id="star_rate_1" type="radio" value="1" v-model="formData.rating" />
            <label for="star_rate_1">★</label>
          </div>
        </div>
        <div class="inner">
          <div class="item">
            <span>Title</span>
            <input class="text-input" type="text" v-model="formData.title" placeholder="Title" />
          </div>
          <div class="item">
            <span>Body</span>
            <textarea v-model="formData.body" class="text-input" type="text" placeholder="Body Text"></textarea>
          </div>

          <div class="item">
            <span>Media</span>
            <div class="flex-row" style="gap: 0.9rem">
              <!-- TODO: (GET WAIT) Add images (waiting for image handling) -->
              <img
                v-for="(image, index) in this.formData.images"
                class="media-image"
                :id="index"
                :src="image.link"
                @click="removeMedia"
              />
              <video
                v-for="(video, index) in this.formData.videos"
                class="media-image"
                :id="index"
                :src="video.link"
                @click="removeMedia"
              ></video>
              <label
                v-if="this.formData.imageCount + this.formData.videoCount < 5"
                for="add-photo"
                class="media-button"
              >
                <img class="media-icon" src="~/assets/icons/camera.svg" alt="" />
                <span class="media-span">Add Photos</span>
              </label>
              <input
                v-if="this.formData.imageCount + this.formData.videoCount < 5"
                type="file"
                id="add-photo"
                accept=".png, .jpg, .jpeg"
                @change="addMedia"
              />
            </div>
          </div>
          <div class="button-row">
            <button class="cancel-button" @click="reloadPage" value="view" style="padding: 0.625rem 1.5rem">
              Cancel
            </button>
            <button @click="addReview" class="save-button" style="padding: 0.625rem 1.5rem">Save Changes</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<style scoped>
input[type='file'] {
  display: none;
}
label {
  cursor: pointer;
}
img {
  cursor: pointer;
}
video.media-button {
  cursor: pointer;
}
</style>
