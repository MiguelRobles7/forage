<script>
export default {
  data() {
    return {
      name: 'Johndayll Arizala',
      formData: {
        profile_picture: '/profile/pfps/1.png',
        banner: '/profile/banners/1.png',
        name: 'Johndayll Arizala',
        account_type: 'personal ',
        description:
          "Nakatitig sa malayo, may lungkot na bumabalot sa'king puso. Sa mundong puno ng tawa at ngiti, ako'y tila isang tanging damo sa disyerto ng kaligayahan. Ang saklap ng pag-ibig, ito ang aking laging kasama. Sa bawat tibok ng puso, ramdam ko ang pagkirot ng nakaraan. Isang alaala ng mga pangakong binitawan, mga sandaling puno ng tamis, ngunit wala nang natira kundi mga pagsisisi.",
        street: 'n/a',
        city: 'Mandaluyong City',
        province: 'Metro Manila',
        country: 'Philippines'
      }
    }
  },
  methods: {
    async editProfile() {
      console.log(this.formData)
      console.log(this.$route.params.id)
      const supabase = useSupabaseClient()
      const { data, error } = await supabase
        .from('profiles')
        .update([
          {
            // TODO: (GET WAIT) Waiting for get before this
            // displayPicture: this.formData.profile_picture,
            // banner: this.formData.banner,
            name: this.formData.name,
            description: this.formData.description,
            country: this.formData.country,
            province: this.formData.province,
            city: this.formData.city
          }
        ])
        .eq('profile_id', this.$route.params.id)
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success!')
        console.log(data)
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="profile-edit">
      <div class="left">
        <div class="banner"></div>
        <div class="profile">
          <img :src="formData.profile_picture" alt="profile image" class="profile-image" />
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
            <button class="save-button" @click="editProfile">Save Changes</button>
            <button class="cancel-button">Cancel</button>
          </div>
        </div>
        <!-- TODO: (GET WAIT) Waiting for get and image functionality -->
        <div class="image-settings">
          <div class="setting-item">
            <span class="setting-span">Profile Picture</span>
            <img :src="formData.profile_picture" alt="profile image" class="profile-image" />
            <button class="profile-image-button">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </button>
          </div>
          <div class="setting-item">
            <span class="setting-span">Banner Picture</span>
            <img :src="formData.banner" alt="banner image" class="banner-image" />
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
