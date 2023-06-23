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
  <div class="manage-review">
    <div class="review-main">
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
    </div>
    <button>
      <img src="/src/assets/profile-edit-redirect/manage-edit.svg" alt="" />
    </button>
    <button>
      <img src="/src/assets/profile-edit-redirect/manage-delete.svg" alt="" />
    </button>
  </div>
</template>

<style></style>
