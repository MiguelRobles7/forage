<script></script>

<template>
  <div class="redirects">
    <div class="redirect-item">
      <img style="height: 1.1em; width: 1.1em" src="~/assets/profile-edit-redirect/general.svg" alt="" />
      <span>General Settings </span>
    </div>
    <div class="redirect-container">
      <div class="redirect-item">
        <img class="icon" src="~/assets/profile-edit-redirect/display.svg" alt="" />
        <span> <NuxtLink to="/profile/edit/1"> Display Settings </NuxtLink> </span>
      </div>
      <div class="redirect-item">
        <img class="icon" src="~/assets/profile-edit-redirect/account-setting.svg" alt="" />
        <span>Account Settings </span>
      </div>
      <div class="redirect-item">
        <img class="icon" src="~/assets/profile-edit-redirect/establishments.svg" alt="" />
        <span>Your Establishments </span>
      </div>
      <div class="redirect-item">
        <img class="icon" src="~/assets/profile-edit-redirect/manage-reviews.svg" alt="" />
        <span> <NuxtLink to="/profile/manage-reviews/1"> Manage Reviews </NuxtLink> </span>
      </div>
    </div>
  </div>
</template>

<style></style>
