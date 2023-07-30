<script>
export default {
  props: {
    isLoggedIn: Boolean,
    loggedUserID: String,
    restaurantID: Number,
    reviewID: Number,
    isUpvoted: Boolean,
    ownerReply: Array,
    userImg: String,
    userName: String,
    userID: Number,
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
  },

  methods: {
    view_discussion: function () {
      this.modal = true
    },
    async triggerUpvote() {
      if (!this.isLoggedIn || this.isUpvoted || this.clientisUpvoted) {
        console.log('Upvote discontinued')
        return
      }
      const upvotes = this.upvotes
      const reviewID = this.reviewID
      const restaurantID = this.restaurantID
      const loggedUserID = this.loggedUserID

      const data = {
        count: upvotes,
        loggedUserID: loggedUserID,
        reviewID: reviewID,
        restaurantID: restaurantID
      }

      await useFetch('/api/reviews/', {
        method: 'POST',
        body: data
      })
      await useFetch('/api/user_upvotes/', {
        method: 'POST',
        body: data
      })

      this.clientUpvotes = this.clientUpvotes + 1
      this.clientisUpvoted = true
    }
  },
  data() {
    return {
      modal: false,
      restaurant: Object,
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean
    }
  },
  async mounted() {
    this.clientUpvotes = this.upvotes
    this.clientDownvotes = this.downvotes
    this.clientisUpvoted = this.isUpvoted
    const supabase = useSupabaseClient()

    let { data: resto, error } = await supabase.from('restaurants').select()
    if (error) {
      console.log(error)
    } else {
      console.log('Success Getting Restaurant Data')
      console.log(resto)

      for (let i = 0; i < resto.length; i++) {
        console.log('restoid ', resto[i].id)
        console.log('this id ', this.restaurantID)
        if (resto[i].id === this.restaurantID) {
          this.restaurant = resto[i]
          console.log('Success ', this.restaurant)
          break
        } else console.log('Failed')
      }
    }
  }
}
</script>

<template>
  <div class="review">
    <NuxtLink :to="`/profile/view/${this.userID}`">
      <img class="reviewer-pfp" :src="userImg" alt="" />
    </NuxtLink>
    <div class="cont">
      <div class="review-item" style="margin: -0.5rem 0 -0.3rem 0">
        <div>
          <span class="tag">{{ userName }}</span>
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
        <p class="body" style="min-width: 63vw; max-width: 63vw">{{ content }}</p>
      </div>
      <div class="review-item" style="gap: 0.4rem">
        <div class="review-voting">
          <div :class="clientisUpvoted ? 'vote-pill-upvoted' : 'vote-pill'">
            <img @click="triggerUpvote" class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
          </div>
          <span class="vote-count">{{ clientUpvotes - clientDownvotes }}</span>
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
          </div>
        </div>
        <div class="review-elements">
          <div class="review-pill" v-if="images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ images.length }} Media Attached</span>
          </div>
          <button @click="view_discussion" class="review-pill" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" v-if="owner_responded" />
            <span class="review-pill-span" v-if="owner_responded">+ {{ comments.length }} Replies</span>
            <span class="review-pill-span" v-else>{{ comments.length }} Replies</span>
            <DiscussionThread
              v-if="modal"
              :reviewId="reviewID"
              :userImg="userImg"
              :userName="userName"
              :userID="userID"
              :title="title"
              :content="content"
              :stars="stars"
              :upvotes="upvotes"
              :downvotes="downvotes"
              :isEdited="isEdited"
              :images="images"
              :comments="comments"
              :logo="restaurant.logo"
              :owner_responded="owner_responded"
            ></DiscussionThread>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
