<script src="./controllers/editReviewController.js" />

<template>
  <main>
    <div class="review-modal modal" id="add-modal" @click.self="closeModal">
      <Loading v-if="!doneLoading"></Loading>
      <div class="modal-main">
        <div class="flex-row" style="width: 100%">
          <span class="title">Write a review for {{ restaurantName }}</span>
          <div class="stars">
            <input class="star-rating" id="star_rate_5" type="radio" value="5" v-model="formData.rating" />
            <label for="star_rate_5">★</label>

            <input class="star-rating" id="star_rate_4" type="radio" value="4" v-model="formData.rating" />
            <label for="star_rate_4">★</label>

            <input class="star-rating" id="star_rate_3" type="radio" value="3" v-model="formData.rating" />
            <label for="star_rate_3">★</label>

            <input class="star-rating" id="star_rate_2" type="radio" value="2" v-model="formData.rating" />
            <label for="star_rate_2">★</label>

            <input class="star-rating" id="star_rate_1" type="radio" value="1" v-model="formData.rating" />
            <label for="star_rate_1">★</label>
          </div>
        </div>
        <div class="inner">
          <div class="item">
            <span>Title</span>
            <input class="text-input" type="text" v-model="formData.title" placeholder="Title" />
          </div>
          <div class="item">
            <span>Body</span>
            <textarea v-model="formData.body" class="text-input" type="text" placeholder="Body Text"></textarea>
          </div>

          <div class="item">
            <span>Media</span>
            <div class="flex-row" style="gap: 0.9rem">
              <img
                v-if="images.length > 0"
                v-for="(image, index) in images"
                :key="image"
                class="media-image"
                :src="image"
                alt=""
                :id="index"
              />
              <img
                v-if="this.formData.addedImages.length > 0"
                v-for="(image, index) in this.formData.addedImages"
                class="media-image"
                :src="image.link"
                :id="'n-' + index"
                @click="deleteImage"
              />
              <label v-if="this.formData.addedImages.length < 5 && !this.formData.hasImage" for="add-photo" class="media-button">
                <img class="media-icon" src="~/assets/icons/camera.svg" alt="" />
                <span class="media-span">Add Photos</span>
              </label>
              <label v-else-if="this.formData.addedImages.length == 0 && this.formData.imageCount > 0" class="media-button" @click="deleteAll">
                <img class="media-icon" src="~/assets/icons/camera.svg" alt="" />
                <span class="media-span">Remove Photos</span>
              </label>
              <input
                v-if="this.formData.imageCount < 5"
                type="file"
                id="add-photo"
                accept=".png, .jpg, .jpeg"
                @change="addMedia"
              />
            </div>
          </div>
          <div class="button-row">
            <button class="cancel-button" @click="closeModal" value="view" style="padding: 0.625rem 1.5rem">
              Cancel
            </button>
            <button @click="editReview" class="save-button" style="padding: 0.625rem 1.5rem">Save Changes</button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </main>
</template>

<style scoped>
img,
label {
  cursor: pointer;
}
input[type='file'] {
  display: none;
}
</style>
