<script></script>

<template>
  <div class="redirects">
    <div class="redirect-item">
      <img style="height: 1.1em; width: 1.1em" src="~/assets/icons/general.svg" alt="" />
      <span>General Settings </span>
    </div>
    <div class="redirect-container">
      <div class="redirect-item">
        <img class="icon" src="~/assets/icons/display.svg" alt="" />
        <span> <NuxtLink to="/profile/edit/display/"> Display Settings </NuxtLink> </span>
      </div>
      <!-- TODO: Add back after functionalities are made -->
      <!-- <div class="redirect-item">
        <img class="icon" src="~/assets/icons/account-setting.svg" alt="" />
        <span><NuxtLink to="/profile/edit/account/1"> Account Settings </NuxtLink> </span>
      </div> -->
      <div class="redirect-item">
        <img class="icon" src="~/assets/icons/manage-reviews.svg" alt="" />
        <span> <NuxtLink to="/profile/manage-reviews/"> Manage Reviews </NuxtLink> </span>
      </div>
    </div>
  </div>
</template>

<style></style>
