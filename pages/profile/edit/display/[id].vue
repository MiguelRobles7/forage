<script>
export default {
  data() {
    return {
      name: 'Johndayll Arizala',
      formData: {
        profile_picture: '/profile/pfps/1.png',
        profile_picture_old: '/profile/pfps/1.png',
        profile_file: null,
        profile_link: null,
        banner: '/profile/banners/1.png',
        banner_old: '/profile/banners/1.png',
        banner_file: null,
        banner_link: null,
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
      let uid = null
      // get user id (to be replaced in the future)
      try {
        const {data, error} = await supabase.auth.getSession()
        uid = data.session.user.id
        if (error)
          throw error
      }
      catch (error) {
        console.log(error)
      }

      // profile picture upload
      if (this.formData.profile_file) {
        try {
          const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${uid}/dp.png`, this.formData.profile_file, {
            cacheControl: ' 0',
            upsert: true
          })
          if (error) {
            throw error
          } else {
            console.log('Uploaded profile picture!')
          }
        }
        catch (error) {
          console.log(error)
        }
      }
      // banner upload
      if (this.formData.banner_file) {
        try {
          const { data, error } = await supabase.storage
          .from('avatars')
          .upload(`${uid}/banner.png`, this.formData.banner_file, {
            cacheControl: ' 0',
            upsert: true
          })
          if (error) {
            throw error
          } else {
            console.log('Uploaded banner!')
          }
        }
        catch (error) {
          console.log(error)
        }
      }
      try {
        const { data, error } = await supabase
        .from('profiles')
        .select('displayPicture, banner')
        .eq('id', uid)
        if (error) {
          throw error
        } else {
          this.formData.profile_link = data[0].displayPicture
          this.formData.banner_link = data[0].banner
          if (this.formData.profile_link === 'https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/default.png' && this.formData.profile_file) {
            this.formData.profile_link = `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/${uid}/dp.png`
          }
          if (this.formData.banner_link === 'https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/default_banner.png' && this.formData.banner_file) {
            this.formData.banner_link = `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/${uid}/banner.png`
          }
          console.log('Success!')
          console.log(data)
        }
      }
      catch (error) {
        console.log(error)
      }
      const { data, error } = await supabase
        .from('profiles')
        .update([
          {
            // TODO: (GET WAIT) Waiting for get before this
            displayPicture: this.formData.profile_link,
            banner: this.formData.banner_link,
            name: this.formData.name,
            description: this.formData.description,
            country: this.formData.country,
            province: this.formData.province,
            city: this.formData.city
          }
        ])
        .eq('id', uid)
        .select()
      if (error) {
        console.log(error)
      } else {
        console.log('Success!')
        console.log(data)
      }
    },
    changeImage(e) {
      if (e.target.id == 'profile-img') {
        this.formData.profile_picture = URL.createObjectURL(e.target.files[0])
        this.formData.profile_file = e.target.files[0]
      } else {
        this.formData.banner = URL.createObjectURL(e.target.files[0])
        this.formData.banner_file = e.target.files[0]
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
          <img :src="formData.profile_picture_old" alt="profile image" class="profile-image" />
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
            <label for="profile-img" class="profile-image-button">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </label>
            <input type="file" id="profile-img" accept=".png, .jpg, .jpeg" @change="changeImage">
          </div>
          <div class="setting-item">
            <span class="setting-span">Banner Picture</span>
            <img :src="formData.banner" alt="banner image" class="banner-image" />
            <label for="banner-img" class="banner-image-button">
              <img src="~\assets\icons\general.svg" alt="" />
              CHANGE
            </label>
            <input type="file" id="banner-img" accept=".png, .jpg, .jpeg" @change="changeImage">
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