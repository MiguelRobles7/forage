<script>
export default {
  props: {
    type: String,
    typeText: String
  },
  data() {
    return {}
  }
}
</script>

<template>
  <main>
    <div class="backdrop">
      <div class="modal">
        <div class="left">
          <div class="flex-col">
            <span class="main-text">Welcome to Forage</span>
            <div class="sub-text">
              Once you've made an account, you'll be able to write your own reviews, upvote or
              downvote others' reviews, register your own establishment, and get a personalized
              feed.
            </div>
          </div>
        </div>
        <div class="right">
          <span class="head">
            <span style="color: #2a7e58">{{ type }} </span>
            {{ typeText }}
          </span>
          <div class="mt-10">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
