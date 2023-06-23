<script>
export default {
  props: {
    restaurant: String
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
    <div class="review-modal modal" id="add-modal">
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Write a review for {{ restaurant }}</span>
          <div class="stars" style="margin: 0 0 0 auto">
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
            <input class="text-input" type="text" placeholder="Title" />
          </div>
          <div class="item">
            <span>Body</span>
            <textarea class="text-input" type="text" placeholder="Body Text"></textarea>
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
            </div>
          </div>
          <div class="button-row">
            <button class="cancel-button" @click="reloadPage" value="view" style="padding: 0.625rem 1.5rem">
              Cancel
            </button>
            <!-- Phase 2 TODO: Make post function for this (diretso na mongo) -->
            <button class="save-button" style="padding: 0.625rem 1.5rem">Save Changes</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<style scoped></style>
