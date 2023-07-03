<script>
export default {
  props: { name: String, image: String },
  methods: {
    click() {
      navigateTo('/profile/view/1');
    }
  }
}
</script>
<template>
  <nav class="navbar" style="background-color: #0d1115">
    <div class="container-fluid">
      <div class="nav-item">
        <a class="navbar-brand" href="/"> Forage </a>
        <input class="nav-search" type="text" placeholder="🔎︎ What are you craving?" />
      </div>

      <div class="d-flex column-gap-3 align-items-center">
        <button class="log-nav-button" @click="click">
          <img :src="image" alt="" />
          <span> {{ name }}</span>
        </button>
        <button class="nav-button">Log Out</button>
      </div>
    </div>
  </nav>
</template>
