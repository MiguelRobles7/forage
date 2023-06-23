<script>
import internal from 'stream'
import OwnerRespondModal from '../components/OwnerRespondModal.vue'
export default {
  components: {
    OwnerRespondModal
  },
  props: {
    restaurant: String,
    title: String,
    rating: Number,
    body: String,
    images: Array,
    upvotes: Number,
    downvotes: Number,

    user: String
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
    <button class="panel-button" @click="edit" value="view">
      <img src="/public/owner_reply.svg" alt="" />
      <OwnerRespondModal v-if="modal" :user="user"></OwnerRespondModal>
    </button>
  </div>
</template>
<script></script>
<style></style>
