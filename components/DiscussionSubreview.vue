<script>
export default {
  props: {
    Comment: Object
  }
}
</script>

<template>
  <div class="discussion-sub">
    <NuxtLink :to="`/profile/view/${this.userID}`">
      <img class="reviewer-pfp" :src="Comment.userImage" alt="" />
    </NuxtLink>
    <div class="discussion-right">
      <div class="discussion-item" style="margin-bottom: -0.5vh">
        <span class="tag">{{ Comment.userName }}</span>
        <span v-if="isEdited" class="tag"> • Edited </span>
      </div>
      <div class="discussion-item">
        <p class="body">{{ Comment.body }}</p>
      </div>
    </div>
    <div class="review-voting">
      <div class="vote-pill">
        <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
      </div>
      <span class="vote-count">{{ Comment.upvotes - Comment.downvotes }}</span>
      <div class="vote-pill">
        <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
      </div>
    </div>
  </div>
</template>
