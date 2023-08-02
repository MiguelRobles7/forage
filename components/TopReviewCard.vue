<script src="./controllers/topReviewCardController.js" />

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
        <p class="body">{{ content }}</p>
      </div>
      <div class="review-item" style="justify-content: flex-end; gap: 0.4rem">
        <div class="review-elements">
          <div class="review-pill" v-if="images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ images.length }}</span>
          </div>
          <div class="review-pill" v-if="comments.length > 0 && owner_responded" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" />
            <span class="review-pill-span">+ {{ comments.length }}</span>
          </div>
          <div class="review-pill" v-if="comments.length > 0 && !owner_responded">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <span class="review-pill-span">{{ comments.length }}</span>
          </div>
        </div>
        <div class="review-voting">
          <button :disabled="clicked" @click="triggerUpvote" class="interact-button">
            <div :class="clicked ? 'vote-pill-disabled' : clientisUpvoted ? 'vote-pill-upvoted' : 'vote-pill'">
              <img class="review-icon" v-if="clientisUpvoted" src="~/assets/icons/upvote_up.svg" alt="" />
              <img class="review-icon" v-else src="~/assets/icons/upvote.svg" alt="" />
            </div>
          </button>
          <span v-if="clientisUpvoted" class="vote-count" style="color: #5ddb8f">
            {{ clientUpvotes - clientDownvotes }}
          </span>
          <span v-else-if="clientisDownvoted" class="vote-count" style="color: #ff5b5b">
            {{ clientUpvotes - clientDownvotes }}
          </span>
          <span v-else class="vote-count" style="color: #e6e6e6">
            {{ clientUpvotes - clientDownvotes }}
          </span>
          <button :disabled="clicked" @click="triggerDownvote" class="interact-button">
            <div :class="clicked ? 'vote-pill-disabled' : clientisDownvoted ? 'vote-pill-downvoted' : 'vote-pill'">
              <img class="review-icon" v-if="clientisDownvoted" src="/assets/icons/upvote_down.svg" alt="" />
              <img class="review-icon" v-else src="/assets/icons/downvote.svg" alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
