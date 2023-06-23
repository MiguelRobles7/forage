<script>
import internal from 'stream'
import EditReviewModal from '../components/EditReviewModal.vue'
export default {
  components: {
    EditReviewModal
  },
  props: {
    restaurant: String,
    title: String,
    rating: Number,
    body: String,
    images: Array,
    upvotes: Number,
    downvotes: Number
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    edit: function () {
      this.modal = true
    }
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
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
          <img class="star" src="/src/assets/icons/star.png" alt="" />
        </div>
      </div>
      <div class="review-item">
        <p class="body">{{ body }}</p>
      </div>
    </div>
    <button class="panel-button" @click="edit" value="view">
      <img src="/src/assets/profile-edit-redirect/manage-edit.svg" alt="" />
      <EditReviewModal
        v-if="modal"
        :restaurant="restaurant"
        :title="title"
        :rating="rating"
        :body="body"
        :images="images"
      ></EditReviewModal>
    </button>
    <button class="panel-button">
      <img src="/src/assets/profile-edit-redirect/manage-delete.svg" alt="" />
    </button>
  </div>
</template>
<script></script>
<style></style>
