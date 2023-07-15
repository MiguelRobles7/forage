<script>
export default {
  props: { name: String, addresses: Array, addresses_links: Array, has_search: Boolean },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      isLoggedIn: true,
      showDropdown: false
    }
  },

  methods: {
    toggleLogin() {
      this.showLogin = !this.showLogin
    },

    toggleRegister() {
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
  <LoginModal v-if="showLogin" @close="toggleLogin"></LoginModal>
  <RegisterModal v-if="showRegister" @close="toggleRegister"></RegisterModal>
  <Dropdown class="dropdown" style="max-width: 18.75rem" v-if="showDropdown"></Dropdown>

  <nav class="navbar nav-default">
    <div class="container-fluid">
      <div class="nav-left">
        <a class="navbar-brand" href="/"> Forage </a>
        <div v-if="has_search" class="search-container">
          <input type="text" class="search" placeholder="Search" />
          <img class="search-icon" src="~/assets/icons/search.svg" alt="search" />
        </div>
      </div>
      <div class="nav-right">
        <div class="links">
          <a v-for="(ad, index) in addresses" :key="index" :href="addresses_links[index]" class="nav-link font-default">
            {{ ad }}
          </a>
        </div>
        <div class="buttons-container">
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleRegister">Sign Up</button>
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleLogin">Log In</button>

          <div v-if="isLoggedIn" class="dropdown-container" @click="toggleDropdown">
            <img class="pfp" src="/profile/pfps/1.png" alt="" />
            <span> {{ name }}</span>
            <img class="drop-icon" src="~/assets/icons/chev_down.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
