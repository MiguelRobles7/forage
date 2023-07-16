<script>
export default {
  data() {
    return {
      profile_picture: '/profile/pfps/1.png',
      banner: '/profile/banners/1.png',
      name: 'Johndayll Arizala',
      account_type: 'personal ',
      description:
        "Nakatitig sa malayo, may lungkot na bumabalot sa'king puso. Sa mundong puno ng tawa at ngiti, ako'y tila isang tanging damo sa disyerto ng kaligayahan. Ang saklap ng pag-ibig, ito ang aking laging kasama. Sa bawat tibok ng puso, ramdam ko ang pagkirot ng nakaraan. Isang alaala ng mga pangakong binitawan, mga sandaling puno ng tamis, ngunit wala nang natira kundi mga pagsisisi.",
      street: 'n/a',
      city: 'Mandaluyong City',
      province: 'Metro Manila',
      country: 'Philippines',
      zip_code: '1550'
    }
  }
}
</script>

<template>
  <main>
    <NavbarDefault name="Johndayll Arizala" :has_search="true"></NavbarDefault>
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
