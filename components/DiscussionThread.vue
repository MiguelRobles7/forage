<script>
export default {
  props: {
    userImg: String,
    userName: String,
    userID: Number,
    title: String,
    content: String,
    stars: Number,
    upvotes: Number,
    downvotes: Number,
    isEdited: Boolean,
    images: Array,
    comments: Array,
    owner_responded: Boolean,
    owner_image: String,
    comments: Object
  },
  data() {
    return {}
  },
  methods: {
    reloadPage() {
      window.location.reload()
    }
  },
  mounted() {
    console.log('These Comments', this.comments)
  }
}
</script>

<template>
  <main>
    <div class="discussion-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="head-row">
          <div style="display: flex; align-items: center; gap: 0.625rem; flex: 1 0 0">
            <img :src="userImg" alt="" />
            <span>
              {{ userName }}
            </span>
          </div>
          <button class="cancel-button" @click="reloadPage" value="view">
            <img src="~/assets/icons/exit.svg" alt="" />
          </button>
        </div>
        <div class="comments">
          <div class="main-comment">
            <div class="review-item" style="margin-bottom: -0.5vh">
              <span class="discussion-tag">{{ title }}</span>
              <div class="stars">
                <img v-for="index in stars" :key="index" class="star" src="~/assets/icons/star.png" alt="" />
              </div>
            </div>
            <div class="review-item">
              <p>{{ content }}</p>
            </div>
            <!-- TODO: Fix For Logic (Just made something quickly for now) -->
            <div class="image-container" v-if="images.length > 0">
              <div class="image-row" v-for="count in Math.ceil(images.length / 3)">
                <img v-for="i in 3" :src="`/_nuxt${images[i * count - 1]}`" alt="" />
              </div>
            </div>

            <div class="review-elements" style="justify-content: flex-start">
              <div class="review-voting">
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/upvote.svg" alt="" />
                </div>
                <span class="vote-count">{{ upvotes - downvotes }}</span>
                <div class="vote-pill">
                  <img class="review-icon" src="~/assets/icons/downvote.svg" alt="" />
                </div>
              </div>
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
          </div>
          <div class="sub-comments" v-if="comments.length > 0">
            <DiscussionSubreview v-for="comment in comments" :Comment="comment"> </DiscussionSubreview>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
