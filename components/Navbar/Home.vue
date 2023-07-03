<script>

export default {
  data() {
    return {
      showLogin: false,
      showRegister: false
    }
  },

  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin
    },

    toggleRegister() {
      this.showRegister = !this.showRegister
    }
  }
}
</script>

<template>
  <LoginModal v-if="showLogin" @close="toggleLogin"></LoginModal>
  <RegisterModal v-if="showRegister" @close="toggleRegister"></RegisterModal>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> Forage </a>
      <div class="d-flex column-gap-3 align-items-center">
        <a href="" class="nav-link font-default"> Home </a>
        <a href="#highlights" class="nav-link font-default"> Highlights </a>
        <a href="#top" class="nav-link font-default"> Top Reviews </a>
        <button class="nav-button" @click="toggleRegister">Sign Up</button>
        <button class="nav-button" @click="toggleLogin">Log In</button>
      </div>
    </div>
  </nav>
</template>
