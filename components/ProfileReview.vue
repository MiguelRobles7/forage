<script>
export default {
  props: {
    review: Object,
    restaurantName: String
  },
}
</script>

<template>
  <div class="review" style="width: 27vw">
    <div class="cont">
      <div class="review-item" style="margin-bottom: -0.5vh">
        <div>
          <span class="tag">Review for {{ restaurantName }}</span>
          <span v-if="isEdited" class="tag"> • Edited </span>
        </div>
        <div class="stars">
          <img v-for="index in review.rating" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
        </div>
      </div>
      <div class="review-item">
        <span class="title-span">{{ review.title }}</span>
            
      </div>
      <div class="review-item">
        <p class="body">{{ review.body }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-end; gap: 0.4rem; flex: 1 0 0; align-self: stretch">
        <div class="review-elements">
          <div class="review-pill" v-if="review.images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ review.images.length }}</span>
          </div>
          <div class="review-pill" v-if="owner_responded" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" />
            <span class="review-pill-span">+ {{ review.comments.length }}</span>
          </div>
          <div class="review-pill" v-if="!owner_responded">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <span class="review-pill-span">{{ review.comments.length }}</span>
          </div>
        </div>

        <div class="review-voting">
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
          </div>
          <span class="vote-count">{{ review.upvotes - review.downvotes }}</span>
          <div class="vote-pill">
            <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
