<script src="./controllers/discussionThreadController.js" />

<template>
  <main>
    <div class="discussion-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="head-row">
          <div style="display: flex; align-items: center; gap: 0.625rem; flex: 1 0 0">
            <img :src="review.userImage" alt="" />
            <span> {{ review.userName }} </span>
          </div>
          <button class="cancel-button" @click="reloadPage" value="view">
            <img src="~/assets/icons/exit.svg" alt="" />
          </button>
        </div>
        <div class="comments">
          <div class="main-comment">
            <div class="review-item" style="margin-bottom: -0.5vh">
              <span class="discussion-tag">{{ review.title }}</span>
              <div class="stars">
                <img v-for="index in review.rating" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
              </div>
            </div>
            <div class="review-item">
              <p>{{ review.body }}</p>
            </div>

            <div class="image-container" v-if="review.images.length > 0">
              <div class="image-row" v-for="count in Math.ceil(review.images.length / 3)">
                <img v-for="i in 3" :src="`/_nuxt${review.images[i * count - 1]}`" alt="" />
              </div>
            </div>

            <div class="review-elements" style="justify-content: flex-start">
              <div class="review-voting">
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
                </div>
                <span class="vote-count">{{ review.upvotes - review.downvotes }}</span>
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
                </div>
              </div>
              <div class="review-pill" v-if="review.images.length > 0">
                <img class="review-icon" src="~/assets/icons/userimage.svg" alt="" />
                <span class="review-pill-span">{{ review.images.length }} Media Attached</span>
              </div>
              <div class="review-pill" v-if="review.comments.length > 0">
                <img class="review-icon" src="~/assets/icons/comment_square.svg" alt="" />
                <span class="review-pill-span">{{ review.restaurantComments.length }} Replies</span>
              </div>
            </div>
          </div>
          <div class="sub-comments" v-if="review.comments.length > 0">
            <DiscussionSubreview
              v-for="comment in review.restaurantComments"
              :userId="review.userId"
              :comment="comment"
            >
            </DiscussionSubreview>
          </div>
          <div style="width: 100%; display: flex; flex-direction: row; gap: 0.8rem">
            <textarea
              class="comment-box"
              placeholder="Write a comment"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              rows="1"
              v-model="body"
            ></textarea>
            <button type="button" @click="addComment" class="comment_submit">
              <img src="~/assets/icons/arrow_right.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
