<script>
export default {
  data() {
    return {
      user: {
        dpLink : String, 
        bannerLink : String, 
        name: String, 
        account_type: String, 
        description: String,
        city: String, 
        province:  String,
        country: String 
      },
      doneLoading: false
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
      const userRequest = await useFetch(`/api/users/session/${userId}`);
      const userData = userRequest.data.value.users[0];
      this.user.name = userData.name;
      this.user.dpLink = userData.displayPicture;
      this.user.bannerLink = userData.banner;
      this.user.description = userData.description;
      this.user.city = userData.city;
      this.user.country = userData.country;
      this.user.province = userData.province;
    }
    this.doneLoading = true;
  }
}
</script>

<template>
  <Loading v-if="!doneLoading"></Loading>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner" :style="`background: url(${user.bannerLink})`"></div>
        <div class="profile">
          <img :src="user.dpLink" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ user.name }}</span>
            <span class="subtext">Your account</span>
          </div>
        </div>
        <ProfileEditRedirect></ProfileEditRedirect>
      </div>
      <div class="right">
        <div class="main-settings">
          <h1>Display Settings</h1>
          <div class="setting-item">
            <span class="setting-span">Display Name</span>
            <input class="profile-input" type="text" :placeholder="user.name" />
          </div>
          <div class="setting-item">
            <span class="setting-span">Description</span>
            <textarea class="profile-input" name="" id="" cols="30" rows="10" :placeholder="user.description"></textarea>
          </div>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">City</span>
              <input class="profile-input" type="text" :placeholder="user.city" />
            </div>
          </div>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">Country</span>
              <input class="profile-input" type="text" :placeholder="user.country" />
            </div>
            <div class="setting-item">
              <span class="setting-span">Province</span>
              <input class="profile-input" type="text" :placeholder="user.province" />
            </div>
          </div>
          <div class="flex-row" style="gap: 1em; margin-top: 0.8em">
            <button class="save-button">Save Changes</button>
            <button class="cancel-button">Cancel</button>
          </div>
        </div>
        <div class="image-settings">
          <div class="setting-item">
            <span class="setting-span">Profile Picture</span>
            <img :src="user.dpLink" alt="profile image" class="profile-image" />
            <button class="profile-image-button">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </button>
          </div>
          <div class="setting-item">
            <span class="setting-span">Banner Picture</span>
            <img :src="user.bannerLink" alt="banner image" class="banner-image" />
            <button class="banner-image-button">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
