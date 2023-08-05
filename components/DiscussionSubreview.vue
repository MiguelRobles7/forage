<script>
export default {
  props: {
    userId: Number,
    comment: Object
  }
}
</script>

<template>
  <div class="discussion-sub">
    <NuxtLink :to="`/profile/view/${this.userID}`">
      <img class="reviewer-pfp" :src="comment.userImage" alt="" />
    </NuxtLink>
    <div class="discussion-right">
      <div class="discussion-item" style="margin-bottom: -0.5vh">
        <span class="tag">{{ comment.userName }}</span>
        <span v-if="comment.isEdited" class="tag"> • Edited </span>
      </div>
      <div class="discussion-item">
        <p class="body">{{ comment.body }}</p>
      </div>
    </div>
  </div>
</template>
