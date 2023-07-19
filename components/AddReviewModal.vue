<script>
import { ref } from 'vue'
// TODO: MCO3 Add Reply to Review

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
        rating: 0,
        title: '',
        body: '',
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
    async addReview() {
      console.log(this.formData)
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            restaurantId: this.formData.restaurantId,
            userId: this.formData.userId,
            rating: this.formData.rating,
            title: this.formData.title,
            body: this.formData.body,
            upvotes: this.formData.upvotes,
            downvotes: this.formData.downvotes,
            isReply: this.formData.isReply
          }
        ])
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success!')
        console.log(data)
      }
      this.reloadPage()
    }
  }
}
</script>

<template>
  <main>
    <div class="review-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Write a review for {{ restaurant }}</span>
          <!-- TODO: MCO3 Turn into radio button -->
          <div class="stars" style="margin: 0 0 0 auto">
            <input
              class="text-input"
              type="number"
              min="1"
              max="5"
              v-model="formData.rating"
              placeholder="Star Number"
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

<style scoped></style>
