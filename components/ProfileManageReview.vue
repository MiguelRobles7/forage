<script>
export default {
  props: {
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
  }
}
</script>

<template>
  <div class="review">
    <div class="cont">
      <div class="review-item" style="margin-bottom: -0.5vh">
        <div>
          <span class="tag">Review for Amogus</span>
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
        <p class="body" style="width: 66vw !important">{{ content }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-start; gap: 0.4rem">
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
          <div class="review-pill" v-if="comments.length > 0 && owner_responded" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" />
            <span class="review-pill-span">+ {{ comments.length }} Replies</span>
          </div>
          <div class="review-pill" v-if="comments.length > 0 && !owner_responded">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <span class="review-pill-span">{{ comments.length }} Replies</span>
          </div>
        </div>
        <div class="profile-actions">
          <button class="review-pill">
            <img class="review-icon" style="height: 0.9rem; width: 0.9rem" src="~/assets/icons/edit-02.svg" alt="" />
            <span class="review-pill-span" style="font-size: 0.75rem">Edit</span>
          </button>
          <button class="review-pill">
            <img class="review-icon" style="height: 0.9rem; width: 0.9rem" src="~/assets/icons/delete.svg" alt="" />
            <span
              class="review-pill-span"
              style="
                background: linear-gradient(180deg, #ff5b5b 0%, #d63d3d 100%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 0.75rem;
              "
              >Delete</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
