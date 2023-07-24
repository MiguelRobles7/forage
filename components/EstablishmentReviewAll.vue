<script>
export default {
  props: {
    reviewId: Number,
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

  methods: {
    view_discussion: function () {
      this.modal = true
    }
  },
  data() {
    return {
      modal: false
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
        <p class="body" style="min-width: 63vw; max-width: 63vw">{{ content }}</p>
      </div>
      <div class="review-item" style="gap: 0.4rem">
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
          <button @click="view_discussion" class="review-pill" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" v-if="owner_responded" />
            <span class="review-pill-span" v-if="owner_responded">+ {{ comments.length }} Replies</span>
            <span class="review-pill-span" v-else>{{ comments.length }} Replies</span>
            <DiscussionThread
              v-if="modal"
              :reviewId="reviewId"
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
            ></DiscussionThread>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
