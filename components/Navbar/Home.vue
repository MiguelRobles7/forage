<script>
export default {
  data() {
    return {
      showLogin: false,
      showRegister: false,
      isLoggedIn: false,
      showDropdown: false
    }
  },

  methods: {
    toggleLogin() {
      if (this.showRegister) 
        this.showRegister = false
      this.showLogin = !this.showLogin
    },

    toggleRegister() {
      if (this.showLogin) 
        this.showLogin = false
      this.showRegister = !this.showRegister
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    hideDropdown() {
      this.showDropdown = false
      console.log('Hide dropdown')
    }
  }
}
</script>

<template>
  <LoginModal v-if="showLogin" @close="toggleLogin" @goReg="toggleRegister"></LoginModal>
  <RegisterModal v-if="showRegister" @close="toggleRegister" @goLog="toggleLogin"></RegisterModal>
  <Dropdown class="dropdown" style="max-width: 18.75rem" v-if="showDropdown" v></Dropdown>

  <nav class="navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"> Forage </a>
      <div class="nav-right">
        <div class="links">
          <a href="#highlights" class="nav-link font-default"> Latest Craze Spots </a>
          <a href="#top" class="nav-link font-default"> Community Favorites </a>
        </div>
        <div class="buttons-container">
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleRegister">Sign Up</button>
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleLogin">Log In</button>

          <div v-if="isLoggedIn" class="dropdown-container" @click="toggleDropdown">
            <img class="pfp" src="/profile/pfps/1.png" alt="" />
            <span> Johndayll Arizala</span>
            <img class="drop-icon" src="~/assets/icons/chev_down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
