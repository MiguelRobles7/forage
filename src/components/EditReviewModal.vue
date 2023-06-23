<script>
export default {
  props: {
    restaurant: String,
    title: String,
    rating: Number,
    body: String,
    images: Array
  },
  data() {
    return {}
  },
  methods: {
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<template>
  <main>
    <div class="review-modal modal" id="edit-modal">
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Edit your review for {{ restaurant }}</span>
          <div class="stars" style="width: auto">
            <img class="star" src="/src/assets/star.png" alt="" />
            <img class="star" src="/src/assets/star.png" alt="" />
            <img class="star" src="/src/assets/star.png" alt="" />
            <img class="star" src="/src/assets/star.png" alt="" />
            <img class="star" src="/src/assets/star.png" alt="" />
          </div>
        </div>
        <div class="inner">
          <div class="item">
            <span>Title</span>
            <input class="text-input" type="text" :placeholder="title" />
          </div>
          <div class="item">
            <span>Body</span>
            <textarea class="text-input" type="text" :placeholder="body"></textarea>
          </div>

          <div class="item">
            <span>Media</span>
            <div class="flex-row" style="gap: 0.9rem">
              <button class="media-button">
                <img class="media-icon" src="/src/assets/review-modal/camera.svg" alt="" />
                <span class="media-span">Add Photos</span>
              </button>
              <button class="media-button">
                <img class="media-icon" src="/src/assets/review-modal/video.svg" alt="" />
                <span class="media-span">Add Videos</span>
              </button>
              <!-- Phase 2 TODO: Make delete on click -->
              <img v-for="image in images" :key="image" class="media-image" :src="image" alt="" />
            </div>
          </div>
          <div class="button-row">
            <button class="cancel-button" @click="reloadPage" value="view">Cancel</button>
            <!-- Phase 2 TODO: Make post function for this (diretso na mongo) -->
            <button class="save-button">Save Changes</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<style scoped></style>
