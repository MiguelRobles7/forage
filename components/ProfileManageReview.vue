<script>
export default {
  props: {
    title: String,
    content: String,
    stars: Number,
    upvotes: Number,
    downvotes: Number,
    isEdited: Boolean,
    images: Array,
    comments: Array,
    owner_responded: Boolean,
    owner_image: String,
    restaurantId: Number,
    userId: Number,
    restaurantName: String
  },
  data() {
    return {
      modal: false,
      rCount: 0,
      avRating: 0
    }
  },
  methods: {
    edit: function () {
      this.modal = true
    },
    async deleteReviews(restaurantId, userId) {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('reviews')
        .update({ isDeleted: true })
        .eq('restaurantId', this.restaurantId)
        .eq('userId', this.userId)
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
      alert('Review Deleted!')
    }
  }
}
</script>

<template>
  <div class="review">
    <div class="cont">
      <div class="review-item" style="margin-bottom: -0.5vh">
        <div>
          <span class="tag">Review for {{ restaurantName }}</span>
          <span v-if="isEdited" class="tag"> • Edited </span>
        </div>
        <div class="stars">
          <img v-for="index in stars" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
        </div>
      </div>
      <div class="review-item">
        <span class="title-span">{{ title }}</span>
      </div>
      <div class="review-item">
        <p class="body" style="width: 66vw !important">{{ content }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-start; gap: 0.4rem">
        <div class="review-voting">
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
          </div>
          <span class="vote-count">{{ upvotes - downvotes }}</span>
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
          </div>
        </div>
        <div class="review-elements">
          <div class="review-pill" v-if="images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ images.length }} Media Attached</span>
          </div>
          <div class="review-pill" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" v-if="owner_responded" />
            <span class="review-pill-span" v-if="owner_responded">+ {{ comments.length }} Replies</span>
            <span class="review-pill-span" v-else>+ {{ comments.length }} Replies</span>
          </div>
        </div>
        <div class="profile-actions">
          <button class="review-pill" @click="edit">
            <img class="review-icon" style="height: 0.9rem; width: 0.9rem" src="~/assets/icons/edit-02.svg" alt="" />
            <span class="review-pill-span" style="font-size: 0.75rem">Edit</span>
            <EditReview
              v-if="modal"
              :restaurantName="restaurantName"
              :restaurantId="restaurantId"
              :userId="userId"
              :title="title"
              :body="content"
              :rating="stars"
              :images="images"
            ></EditReview>
          </button>
          <button class="review-pill" @click="deleteReviews">
            <img class="review-icon" style="height: 0.9rem; width: 0.9rem" src="~/assets/icons/delete.svg" alt="" />
            <span
              class="review-pill-span"
              style="
                background: linear-gradient(180deg, #ff5b5b 0%, #d63d3d 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 0.75rem;
              "
              >Delete</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
