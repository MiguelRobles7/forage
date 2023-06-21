<script>
import HomeViewNav from '../components/navbars/HomeViewNav.vue'
import ProfileEditRedirect from '../components/ProfileEditRedirect.vue'
export default {
  components: {
    HomeViewNav,
    ProfileEditRedirect
  },
  data() {
    return {
      profile_picture: '/src/assets/profile-edit-display/user.png',
      banner: '/src/assets/profile-edit-display/banner.png',
      name: 'I miss you balik ka na',
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
    <HomeViewNav></HomeViewNav>
    <div class="profile-edit-display">
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
      <div class="right">betlog</div>
    </div>
  </main>
</template>

<style>
.gradient-bg {
  background: linear-gradient(-7.28deg, #1d1d1f 24.57%, rgba(29, 29, 31, 0.2) 90.45%), url('../assets/home-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 130vh;
}
</style>
