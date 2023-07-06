<script>
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
        <span class="tag">{{ userName }}</span>
        <!-- Phase 2 TODO: Innovative way for starring -->
        <div class="stars">
          <img class="star" src="~/assets/icons/star.png" alt="" />
          <img class="star" src="~/assets/icons/star.png" alt="" />
          <img class="star" src="~/assets/icons/star.png" alt="" />
          <img class="star" src="~/assets/icons/star.png" alt="" />
          <img class="star" src="~/assets/icons/star.png" alt="" />
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
        <img class="review-icon" src="~/assets/review-cards/userimage.png" alt="" />
        <div class="review-voting">
          <img class="review-icon" src="~/assets/review-cards/upvote.svg" alt="" />
          {{ upvotes - downvotes }}
          <img class="review-icon" src="~/assets/review-cards/downvote.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
