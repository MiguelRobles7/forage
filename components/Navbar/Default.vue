<script>
export default {
  props: { name: String, addresses: Array, addresses_links: Array, has_search: Boolean},
  data() {
    return {
      doneLoading: false,
      showLogin: false,
      showRegister: false,
      showDropdown: false,
      isLoggedIn: false
    }
  },
  async created() {
    const supabase = useSupabaseClient();
    var supabaseSession = ref(await supabase.auth.getSession());
    var userData = ref(null)

    if (!supabaseSession.value.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userData.value = supabaseSession.value.data.session.user
    }
    this.doneLoading = true;
  },
  mounted() {
    console.log("done nav");
    this.$emit('doneNav');
  },
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
      this.isLoggedIn = true;
    },
    toggleLogout() {
      this.isLoggedIn = false;
    }
  }
}
</script>

<template>
  <Loading v-if="!doneLoading"></Loading>
  <LoginModal v-if="showLogin" @close="toggleLoginModal" @login="toggleLogin"></LoginModal>
  <RegisterModal v-if="showRegister" @close="toggleRegisterModal"></RegisterModal>
  <Dropdown class="dropdown" style="max-width: 18.75rem" v-if="showDropdown" @logout="toggleLogout" @close="toggleDropdown"></Dropdown>

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
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleRegisterModal">Sign Up</button>
          <button v-if="!isLoggedIn" class="nav-button" @click="toggleLoginModal">Log In</button>

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
