<script>
import internal from 'stream'

export default {
  props: {
    title: String,
    rating: Number,
    body: String,
    images: Array,
    upvotes: Number,
    downvotes: Number
  }
}
</script>

<template>
  <div class="profile-review">
    <div class="review-item">
      <span>{{ title }}</span>
      <!-- Phase 2 TODO: Innovative way for starring -->
      <div class="stars">
        <img class="star" src="/src/assets/star.png" alt="" />
        <img class="star" src="/src/assets/star.png" alt="" />
        <img class="star" src="/src/assets/star.png" alt="" />
        <img class="star" src="/src/assets/star.png" alt="" />
        <img class="star" src="/src/assets/star.png" alt="" />
      </div>
    </div>
    <div class="review-item">
      <p class="body">{{ body }}</p>
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
</template>

<style></style>
