<script>
import internal from 'stream'

export default {
  props: {
    imgPath: String,
    bgImgPath: String,
    name: String,
    description: String,
    tags: String,
    reviewCount: Number,
    rating: Number,
    price: String
  }
}
</script>

<template>
  <div class="restaurant-card">
    <img :src="imgPath" alt="" class="restaurant-card-image" />
    <div
      class="flex-col rcard"
      :style="`background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${bgImgPath});`"
    >
      <div class="flex-row def-gap stats">
        <img src="~/assets/icons/star.png" alt="" class="def-icon" />
        <div class="icon-font">{{ rating }} rating</div>
        <div class="icon-font">●</div>

        <img src="~/assets/icons/comments.png" alt="" class="def-icon" />
        <div class="icon-font">{{ reviewCount }} reviews</div>
        <div class="icon-font">●</div>
        <!-- TODO: Replace with innovative way to make some dollars greyer based on price range  -->
        <div class="icon-font">{{ price }}</div>
      </div>
      <div class="name">{{ name }}</div>
      <div class="summary">{{ tags }}</div>
      <div class="description">{{ description }}</div>
    </div>
  </div>
</template>

<style></style>
