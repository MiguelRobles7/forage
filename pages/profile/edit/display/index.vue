<script src="./controller.js" />

<template>
  <Loading v-if="!doneLoading"></Loading>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner" :style="`background: url(${user.bannerLink})`"></div>
        <div class="profile">
          <img :src="user.dpLink" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ name }}</span>
            <span class="subtext">Your {{ formData.account_type }} account</span>
          </div>
        </div>
        <ProfileEditRedirect></ProfileEditRedirect>
      </div>
      <div class="right">
        <div class="main-settings">
          <h1>Display Settings</h1>
          <div class="setting-item">
            <span class="setting-span">Display Name</span>
            <input class="profile-input" type="text" v-model="formData.name" />
          </div>
          <div class="setting-item">
            <span class="setting-span">Description</span>
            <textarea class="profile-input" name="" id="" cols="30" rows="10" v-model="formData.description"></textarea>
          </div>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">City</span>
              <input class="profile-input" type="text" v-model="formData.city" />
            </div>
          </div>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">Country</span>
              <input class="profile-input" type="text" v-model="formData.country" />
            </div>
            <div class="setting-item">
              <span class="setting-span">Province</span>
              <input class="profile-input" type="text" v-model="formData.province" />
            </div>
          </div>
          <div class="flex-row" style="gap: 1em; margin-top: 0.8em">
            <button class="save-button" @click="updateProfile">Save Changes</button>
            <button class="cancel-button">Cancel</button>
            <span v-if="waiting"> Please wait for a while as we update your information </span>
          </div>
        </div>
        <div class="image-settings">
          <div class="setting-item">
            <span class="setting-span">Profile Picture</span>
            <img id="profile" :src="user.dpLink" alt="profile image" class="profile-image" />
            <label class="profile-image-button" for="profile-img">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </label>
            <input type="file" id="profile-img" accept=".png, .jpg, .jpeg" @change="changeImage" />
          </div>
          <div class="setting-item">
            <span class="setting-span">Banner Picture</span>
            <img id="banner" :src="user.bannerLink" alt="banner image" class="banner-image" />
            <label class="banner-image-button" for="banner-img">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </label>
            <input type="file" id="banner-img" accept=".png, .jpg, .jpeg" @change="changeImage" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
input[type='file'] {
  display: none;
}
label {
  cursor: pointer;
}
</style>
