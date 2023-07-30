<script>
export default {
  props: { addresses: Array, addresses_links: Array },
  data() {
    return {
      user: {
        uid: Number, 
        id: Number,
        name: String,
        dpLink: String
      },
      doneLoading: false,
      showLogin: false,
      showRegister: false,
      showDropdown: false,
      isLoggedIn: false,
      has_search: true,
      searchCriteria: ''
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      this.user.uid = userSession.id
      const userRequest = await useFetch(`/api/users/session/${this.user.uid}`)
      const userData = userRequest.data.value.users[0]
      this.user.name = userData.name;
      this.user.dpLink = userData.displayPicture;
      this.user.id = userData.profile_id;
    }
    this.$emit('doneNav')
    this.doneLoading = true
  },
  mounted() {},
  methods: {
    toggleLoginModal() {
      this.showLogin = !this.showLogin
    },

    toggleRegisterModal() {
      this.showRegister = !this.showRegister
    },

    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    hideDropdown() {
      this.showDropdown = false
      console.log('Hide dropdown')
    },
    toggleLogin() {
      location.reload()
    },
    toggleLogout() {
      location.reload()
    },
    enter_search() {
      this.$router.push('/establishment/search/' + this.searchCriteria)
    }
  }
}
</script>

<template>
  <Loading v-if="!doneLoading"></Loading>
  <div v-if="doneLoading">
    <LoginModal v-if="showLogin" @close="toggleLoginModal" @login="toggleLogin"></LoginModal>
    <RegisterModal v-if="showRegister" @close="toggleRegisterModal"></RegisterModal>
    <div v-if="isLoggedIn">
      <Dropdown
        :userName="user.name"
        :userID="user.id"
        :dpLink="user.dpLink"
        class="dropdown"
        style="max-width: 18.75rem"
        v-show="showDropdown"
        @logout="toggleLogout"
        @close="toggleDropdown"
      ></Dropdown>
    </div>

    <nav class="navbar nav-default">
      <div class="container-fluid">
        <div class="nav-left">
          <a class="navbar-brand" href="/"> Forage </a>
          <div v-if="has_search" class="search-container">
            <input
              type="text"
              class="search"
              placeholder="Search"
              v-model="searchCriteria"
              @keyup.enter="enter_search()"
            />
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
            <button v-if="!isLoggedIn" class="nav-button" @click="toggleRegisterModal">Sign Up</button>
            <button v-if="!isLoggedIn" class="nav-button" @click="toggleLoginModal">Log In</button>

            <div v-if="isLoggedIn" class="dropdown-container" @click="toggleDropdown">
              <img class="pfp" :src="user.dpLink" alt="" />
              <span> {{ user.name }}</span>
              <img class="drop-icon" src="~/assets/icons/chev_down.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
