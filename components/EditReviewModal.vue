<script>
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
        images: []
      }
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
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
          isReply: this.formData.isReply
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
      // TODO: Make proper alert
      alert('Please wait for the page to reload')
      setTimeout(function () {
        window.location.reload()
      }, 8000)
    }
  }
}
</script>

<template>
  <main>
    <div class="review-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Write a review for {{ restaurantName }}</span>
          <!-- TODO:MCO3 Turn into radio button -->
          <div class="stars" style="margin: 0 0 0 auto">
            <input
              class="text-input"
              type="number"
              min="1"
              max="5"
              v-model="formData.rating"
              style="width: fit-content"
            />
            <img class="star" src="~/assets/icons/star.png" alt="" />
            <img class="star" src="~/assets/icons/star.png" alt="" />
            <img class="star" src="~/assets/icons/star.png" alt="" />
            <img class="star" src="~/assets/icons/star.png" alt="" />
            <img class="star" src="~/assets/icons/star.png" alt="" />
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
              <button class="media-button">
                <img class="media-icon" src="~/assets/icons/camera.svg" alt="" />
                <span class="media-span">Add Photos</span>
              </button>
              <img
                v-if="images.length > 0"
                v-for="image in images"
                :key="image"
                class="media-image"
                :src="image"
                alt=""
              />
            </div>
          </div>
          <div class="button-row">
            <button class="cancel-button" @click="reloadPage" value="view" style="padding: 0.625rem 1.5rem">
              Cancel
            </button>
            <button @click="editReview" class="save-button" style="padding: 0.625rem 1.5rem">Save Changes</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<style scoped></style>
