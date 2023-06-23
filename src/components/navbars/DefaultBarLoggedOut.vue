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
  <nav class="navbar" style="background-color: #0d1115">
    <div class="container-fluid">
      <a class="navbar-brand" href="/index"> Forage </a>
      <div class="d-flex column-gap-3 align-items-center">
        <button class="nav-button" @click="toggleRegister">Sign Up</button>
        <button class="nav-button" @click="toggleLogin">Log In</button>
      </div>
    </div>
  </nav>
</template>
