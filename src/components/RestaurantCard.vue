<script>
import internal from 'stream'

export default {
  props: {
    imgPath: String,
    name: String,
    description: String,
    summary: String,
    reviewCount: Number,
    rating: Number
  }
}
</script>

<template>
  <div class="grid grid-cols-[auto_1fr] restaurant-card mb-4">
    <img :src="imgPath" alt="" class="rounded-s-md" />
    <div class="bg-fade w-[450px] rounded-e-md px-6 flex">
      <div class="mt-4">
        <div class="flex">
          <div class="font-TTInterphases font-bold text-2xl mt-4">{{ name }}</div>
          <div class="flex grow justify-end">
            <div class="flex">
              <img src="../assets/star.png" alt="" class="w-[.85rem] h-[.85rem] mt-[.12rem] mr-2" />
              <div class="font-TTInterphases mr-2 text-sm">{{ rating }} rating</div>
              <div class="text-[.5rem] mt-1 mr-2">●</div>
            </div>
            <div class="flex">
              <img src="../assets/comments.png" alt="" class="w-[.85rem] h-[.85rem] mt-[.2rem] mr-2" />
              <div class="font-TTInterphases mr-2 text-sm">{{ reviewCount }} reviews</div>
              <div class="text-[.5rem] mt-1 mr-2">●</div>
            </div>
            <div class="font-TTInterphases text-sm">$$$</div>
          </div>
        </div>
        <div class="font-TTInterphases text-xs mt-1">{{ summary }}</div>
        <div class="font-TTInterphases text-xs mt-1">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-fade {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('../assets/coffee-time-bg-s.png');
  background-size: cover;
}
</style>
