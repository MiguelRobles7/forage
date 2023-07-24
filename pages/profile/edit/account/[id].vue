<script src="./controller.js">
</script>

<template>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="profile_picture" alt="profile image" class="profile-image" />
          <div class="profile-info">
            <span class="name">{{ name }}</span>
            <span class="subtext">Your {{ account_type }} account</span>
          </div>
        </div>
        <ProfileEditRedirect></ProfileEditRedirect>
      </div>
      <div class="right">
        <div class="main-settings">
          <span class="main-text">Display Settings</span>
          <span class="secondary-text">Change your password</span>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">Password</span>
              <input class="profile-input" type="password" placeholder="Password" />
            </div>
            <div class="setting-item">
              <span class="setting-span">Confirm Password</span>
              <input class="profile-input" type="password" placeholder="Confirm Password" />
            </div>
          </div>
          <div class="setting-pair">
            <div class="setting-item">
              <span class="setting-span">New Password</span>
              <input class="profile-input" type="password" placeholder="Password" />
            </div>
            <div class="setting-item">
              <span class="setting-span">Confirm New Password</span>
              <input class="profile-input" type="password" placeholder="Confirm Password" />
            </div>
          </div>
          <div class="flex-row" style="gap: 1em; margin-top: 0.8em; justify-content: flex-end">
            <button class="save-button">Change Password</button>
          </div>

          <span class="secondary-text">Delete your account</span>
          <p>Once you delete your account, there is no going back. Please be certain.</p>

          <div class="flex-row">
            <button class="delete-button">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
