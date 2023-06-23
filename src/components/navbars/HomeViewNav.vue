<script>
import LoginModal from '../../views/LoginView.vue'
import RegisterModal from '../../views/RegisterView.vue'

export default {
  components: {
    LoginModal, RegisterModal
  },

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
  <Teleport to=".modals">
    <LoginModal v-if="showLogin" @close="toggleLogin"></LoginModal> 
    <RegisterModal v-if="showRegister" @close="toggleRegister"></RegisterModal>
  </Teleport>
  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/index"> Forage </a>
      <div class="d-flex column-gap-3 align-items-center">
        <a href="" class="nav-link font-default"> Home </a>
        <a href="" class="nav-link font-default"> Highlights </a>
        <a href="" class="nav-link font-default"> Top Reviews </a>
        <a href="" class="nav-link font-default"> Hot </a>
        <a href="" class="nav-link font-default"> Near You </a>
        <button class="nav-button" @click="toggleRegister">Sign Up</button>
        <button class="nav-button" @click="toggleLogin">Log In</button>
      </div>
    </div>
  </nav>
</template>
