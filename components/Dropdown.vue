<script>
export default {
  data() {
    return {}
  },
  methods: {
    async logout() {
      const supabase = useSupabaseClient()
      const { error } = await supabase.auth.signOut()
      this.$emit('close')
      this.$emit('logout')
    }
  }
}
</script>
<template>
  <div class="dropdown">
    <NuxtLink to="/profile/view/1" style="display: contents">
      <div class="dropdown-head">
        <img class="head-pfp" src="/profile/pfps/1.png" alt="" />
        <span class="head-span"> Johndayll Arizala</span>
      </div>
    </NuxtLink>

    <div class="dropdown-items-container">
      <NuxtLink to="/profile/edit/display/1" style="display: contents">
        <div class="dropdown-item">
          <img class="icon" src="~/assets/icons/display.svg" alt="" />
          <span class="text"> Display Settings </span>
          <img src="~/assets/icons/d_chev_right.svg" alt="" />
        </div>
      </NuxtLink>
      <!-- <NuxtLink to="/profile/edit/account/1" style="display: contents">
        <div class="dropdown-item">
          <img class="icon" src="~/assets/icons/account-setting.svg" alt="" />
          <span class="text">Account Settings </span>
          <img src="~/assets/icons/d_chev_right.svg" alt="" />
        </div>
      </NuxtLink> -->

      <NuxtLink to="/profile/manage-reviews/1" style="display: contents">
        <div class="dropdown-item">
          <img class="icon" src="~/assets/icons/manage-reviews.svg" alt="" />
          <span class="text"> Manage Reviews </span>
          <img src="~/assets/icons/d_chev_right.svg" alt="" />
        </div>
      </NuxtLink>

      <a @click="logout">
        <div class="dropdown-item">
          <img class="icon" src="~/assets/icons/logout.svg" alt="" />
          <span class="text"> Logout </span>
        </div>
      </a>
    </div>
  </div>
</template>

<style></style>
