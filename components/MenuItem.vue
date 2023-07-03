<script>
export default {
  props: {
    imgPath: String,
    name: String,
    price: Number
  }
}
</script>

<template>
  <div class="menu-item-card">
    <img :src="imgPath" alt="" style="border-radius: 4px" />
    <div class="item-name">{{ name }}</div>
    <div class="item-price">₱ {{ price }}</div>
  </div>
</template>
