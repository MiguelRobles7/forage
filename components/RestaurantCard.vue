<script>
export default {
  props: {
    imgPath: String,
    bgImgPath: String,
    name: String,
    description: String,
    tags: Array,
    reviewCount: Number,
    rating: Number,
    price: String
  }
}
</script>

<template>
  <div class="restaurant-card">
    <div class="stats">
      <div
        class="info-pill"
        style="background: linear-gradient(180deg, #edcc78 0%, #e5b351 100%); padding: 0.18rem 0.5rem !important"
      >
        <img src="~/assets/icons/star_empty.svg" alt="" class="info-icon" />
        <div class="info-text">{{ rating }}</div>
      </div>
      <div
        class="info-pill"
        style="background: linear-gradient(180deg, #78c6ff 0%, #4291ca 100%); padding: 0.18rem 0.5rem !important"
      >
        <img src="~/assets/icons/comments.png" alt="" class="info-icon" />
        <div class="info-text">{{ reviewCount }}</div>
      </div>
      <div
        class="info-pill"
        style="background: linear-gradient(180deg, #5ddb8f 0%, #2aa15a 100%); padding: 0.18rem 0.5rem !important"
      >
        <img src="~/assets/icons/wallet.svg" alt="" class="info-icon" />
        <div class="info-text">{{ price }}</div>
      </div>
    </div>
    <img :src="imgPath" alt="" class="restaurant-card-image" />
    <div class="name">{{ name }}</div>
    <div class="description">{{ description }}</div>
    <div class="tags">
      <div class="info-pill" v-for="t in tags">
        <div class="info-text" style="text-decoration-line: underline">{{ t }}</div>
      </div>
    </div>
  </div>
</template>
