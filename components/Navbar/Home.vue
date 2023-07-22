<script>
export default {
  data() {
    return {
      user: {
        name: String, 
        dpLink: String
      },
      doneLoading: false,
      showLogin: false,
      showRegister: false,
      showDropdown: false,
      isLoggedIn: false
    }
  },

  async created() {
    const supabase = useSupabaseClient();
    var supabaseSession = await supabase.auth.getSession();
    var userSession = null;
    var userId = "";

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id;
      const userRequest = await useFetch(`/api/users/${userId}`);
      const userData = userRequest.data.value.users[0];
      this.user.name = userData.name;
      this.user.dpLink = userData.displayPicture;
    }
    console.log("done nav...");
    this.$emit('doneNav');
    this.doneLoading = true;
  },
  mounted() {
  },
  methods: {
    toggleLoginModal() {
      if (this.showRegister) this.showRegister = false
      this.showLogin = !this.showLogin
    },

    toggleRegisterModal() {
      if (this.showLogin) this.showLogin = false
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
      location.reload();
    },
    toggleLogout() {
      location.reload();
    }
  }
}
</script>

<template>
  <Loading v-if="!doneLoading"></Loading>
  <LoginModal v-if="showLogin" @close="toggleLoginModal" @goReg="toggleRegisterModal" @login="toggleLogin"></LoginModal>
  <RegisterModal v-if="showRegister" @close="toggleRegisterModal" @goLog="toggleLoginModal"></RegisterModal>
  <Dropdown
    @close="toggleDropdown"
    @logout="toggleLogout"
    class="dropdown"
    style="max-width: 18.75rem"
    v-show="showDropdown"
  ></Dropdown>

  <nav class="navbar home-nav">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/"> Forage </NuxtLink>
      <div class="nav-right">
        <div class="links">
          <a href="#highlights" class="nav-link font-default"> Latest Craze Spots </a>
          <a href="#top" class="nav-link font-default"> Community Favorites </a>
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
</template>
