<script>
export default {
  data() {
    return {
      clientUpvotes: Number,
      clientDownvotes: Number,
      clientisUpvoted: Boolean
    }
  },
  props: {
    isUpvoted: Boolean,
    loggedUserID: String,
    reviewID: Number,
    restaurantID: Number,
    isLoggedIn: Boolean,
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
    owner_image: String
  },
  mounted() {
    this.clientUpvotes = this.upvotes
    this.clientDownvotes = this.downvotes
    this.clientisUpvoted = this.isUpvoted
  },
  methods: {
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
  }
}
</script>

<template>
  <div class="review">
    <NuxtLink :to="`/profile/view/${this.userID}`">
      <img class="reviewer-pfp" :src="userImg" alt="" />
    </NuxtLink>
    <div class="cont">
      <div class="review-item" style="margin-bottom: -0.5vh">
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
        <p class="body">{{ content }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-end; gap: 0.4rem">
        <div class="review-elements">
          <div class="review-pill" v-if="images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ images.length }}</span>
          </div>
          <div class="review-pill" v-if="comments.length > 0 && owner_responded" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" />
            <span class="review-pill-span">+ {{ comments.length }}</span>
          </div>
          <div class="review-pill" v-if="comments.length > 0 && !owner_responded">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <span class="review-pill-span">{{ comments.length }}</span>
          </div> 
        </div>
        <div class="review-voting">
          <div :class="clientisUpvoted ? 'vote-pill-upvoted' : 'vote-pill'">
            <img @click="triggerUpvote" class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
          </div>
          <span class="vote-count">{{ clientUpvotes - clientDownvotes }}</span>
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
