<script src="./controllers/reviewCardController.js" />

<template>
  <div class="review">
    <NuxtLink :to="`/profile/view/${review.userId}`">
      <img class="reviewer-pfp" :src="review.userImage" alt="" />
    </NuxtLink>
    <div class="cont">
      <div class="review-item" style="margin: -0.5rem 0 -0.3rem 0">
        <div>
          <span class="tag">{{ review.userName }}</span>
          <span v-if="review.isEdited" class="tag"> • Edited </span>
        </div>
        <div class="stars">
          <img v-for="index in review.rating" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
        </div>
      </div>
      <div class="review-item">
        <span class="title-span">{{ review.title }}</span>
      </div>
      <div class="review-item">
        <p class="body" style="min-width: 63vw; max-width: 63vw">{{ review.body }}</p>
      </div>
      <div class="review-item" style="gap: 0.4rem">
        <div class="review-voting">
          <div :class="clientisUpvoted ? 'vote-pill-upvoted' : 'vote-pill'">
            <img @click="triggerUpvote" class="review-icon" v-if="clientisUpvoted" src="~/assets/icons/upvote_up.svg" />
            <img @click="triggerUpvote" class="review-icon" v-else src="~/assets/icons/upvote.svg" alt="" />
          </div>
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
        <div class="review-elements">
          <div class="review-pill" v-if="review.images.length > 0">
            <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
            <span class="review-pill-span">{{ review.images.length }} Media Attached</span>
          </div>
          <button @click="view_discussion" class="review-pill" style="gap: 0.4rem">
            <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
            <img class="owner-image" :src="owner_image" alt="" v-if="review.ownerResponded" />
            <span class="review-pill-span" v-if="review.ownerResponded"
              >+ {{ review.restaurantComments.length }} Replies</span
            >
            <span class="review-pill-span" v-else>{{ review.restaurantComments.length }} Replies</span>
            <DiscussionThread v-if="modal" :review="review" :logo="restaurant.logo"></DiscussionThread>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
