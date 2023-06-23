<script>
import internal from 'stream'

import { RouterLink } from 'vue-router';
export default {
    props: {
        ownerReply: Array,
        userImg: String,
        userName: String,
        userID: Number,
        title: String,
        content: String,
        stars: Number,
        upvotes: Number,
        downvotes: Number
    },
    components: { RouterLink }
}
</script>

<template>
  <div class="review">
    <RouterLink :to="{name: 'profile-view', params: {id: this.userID}}">
      <img class="reviewer-pfp" :src="userImg" alt="" />
    </RouterLink>
    <div class="cont">
      <div class="review-item" style="margin-bottom: -0.5vh">
        <span class="tag">{{ userName }}</span>
        <!-- Phase 2 TODO: Innovative way for starring -->
        <div class="stars">
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
        </div>
      </div>
      <div class="review-item">
        <span class="title-span">{{ title }}</span>
      </div>
      <div class="review-item">
        <p class="body">{{ content }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-end; gap: 0.625rem">
        <!-- Phase 2 TODO: innovative way to load all images dynamically -->
        <img class="review-icon" src="/src/assets/review-cards/userimage.png" alt="" />
        <div class="review-voting">
          <img class="review-icon" src="/src/assets/review-cards/upvote.svg" alt="" />
          {{ upvotes - downvotes }}
          <img class="review-icon" src="/src/assets/review-cards/downvote.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <div class="reply" v-if="Array.isArray(ownerReply) && ownerReply.length">
    <img src="/public/reply.svg" alt="" />
    <div class="review" style="flex-basis: 100%">
      <img class="reviewer-pfp" :src="ownerReply[1]" alt="" />
      <div class="cont">
        <div class="review-item" style="margin-bottom: -0.5vh">
          <span class="tag">{{ ownerReply[0] }}</span>
          <!-- Phase 2 TODO: Innovative way for starring -->
          <div class="stars">
            <img class="star" src="/src/assets/icons/star.png" alt="" />
            <img class="star" src="/src/assets/icons/star.png" alt="" />
            <img class="star" src="/src/assets/icons/star.png" alt="" />
            <img class="star" src="/src/assets/icons/star.png" alt="" />
            <img class="star" src="/src/assets/icons/star.png" alt="" />
          </div>
        </div>
        <div class="review-item">
          <span class="title-span">{{ ownerReply[2] }}</span>
        </div>
        <div class="review-item">
          <p class="body">{{ ownerReply[3] }}</p>
        </div>
        <div class="review-item" style="justify-content: flex-end; gap: 0.625rem">
          <!-- Phase 2 TODO: innovative way to load all images dynamically -->
          <img class="review-icon" src="/src/assets/review-cards/userimage.png" alt="" />
          <div class="review-voting">
            <img class="review-icon" src="/src/assets/review-cards/upvote.svg" alt="" />
            {{ ownerReply[4] }}
            <img class="review-icon" src="/src/assets/review-cards/downvote.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
