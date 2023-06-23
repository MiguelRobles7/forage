<script>
export default {
  props: {
    type: String,
    typeText: String
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal" style="position: static">
      <div class="left">
        <div class="flex-col">
          <span class="main-text">Welcome to Forage</span>
          <div class="sub-text">
            Once you've made an account, you'll be able to write your own reviews, upvote or downvote others' reviews,
            register your own establishment, and get a personalized feed.
          </div>
        </div>
      </div>
      <div class="right">
        <span class="head">
          <span style="color: #2a7e58">{{ type }} </span>
          {{ typeText }}
        </span>
        <div class="title-margin">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
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
  color: #f8f9fa;
}
.title-margin {
  margin-top: 20px;
}
</style>
