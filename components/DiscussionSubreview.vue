<script>
export default {
  props: {
    userImg: String,
    userName: String,
    content: String,
    upvotes: Number,
    downvotes: Number,
    isEdited: Boolean
  }
}
</script>

<template>
  <div class="discussion-sub">
    <NuxtLink :to="`/profile/view/${this.userID}`">
      <img class="reviewer-pfp" :src="userImg" alt="" />
    </NuxtLink>
    <div class="discussion-right">
      <div class="discussion-item" style="margin-bottom: -0.5vh">
        <span class="tag">{{ userName }}</span>
        <span v-if="isEdited" class="tag"> • Edited </span>
      </div>
      <div class="discussion-item">
        <p class="body">{{ content }}</p>
      </div>
    </div>
    <div class="review-voting">
      <div class="vote-pill">
        <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
      </div>
      <span class="vote-count">{{ upvotes - downvotes }}</span>
      <div class="vote-pill">
        <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
      </div>
    </div>
  </div>
</template>
