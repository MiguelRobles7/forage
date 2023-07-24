export default {
  data() {
    return {
      user: {
        dpLink: String,
        bannerLink: String,
        name: String,
        account_type: String,
        description: String,
        city: String,
        province: String,
        country: String
      },
      doneLoading: false,
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
        name: 'a',
        account_type: 'personal',
        description: 'a',
        street: 'a',
        city: 'a',
        province: 'a',
        country: 'a'
      }
    }
  },

  methods: {
    async updateProfile() {
      console.log(this.formData)
      const supabase = useSupabaseClient()
      let uid = null
      // get user id (to be replaced in the future)
      try {
        const { data, error } = await supabase.auth.getSession()
        uid = data.session.user.id
        console.log(uid)
        if (error) throw error
      } catch (error) {
        console.log(error)
      }
      const { data, error } = await supabase
        .from('profiles')
        .update([
          {
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
        this.editProfile()
        console.log('Success!')
        console.log(data)
      }

      window.location.reload()
    },
    async editProfile() {
      console.log(this.formData)
      console.log(this.$route.params.id)

      const supabase = useSupabaseClient()
      let uid = null
      // get user id (to be replaced in the future)
      try {
        const { data, error } = await supabase.auth.getSession()
        uid = data.session.user.id
        console.log(uid)
        if (error) throw error
      } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
          console.log(error)
        }
      }
      try {
        const { data, error } = await supabase.from('profiles').select('displayPicture, banner').eq('id', uid)
        if (error) {
          throw error
        } else {
          this.formData.profile_link = data[0].displayPicture
          this.formData.banner_link = data[0].banner
          if (
            this.formData.profile_link ===
              'https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/default.png' &&
            this.formData.profile_file
          ) {
            this.formData.profile_link = `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/${uid}/dp.png`
          }
          if (
            this.formData.banner_link ===
              'https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/default_banner.png' &&
            this.formData.banner_file
          ) {
            this.formData.banner_link = `https://ybdgcrjtuhafbgnuangd.supabase.co/storage/v1/object/public/avatars/${uid}/banner.png`
          }
          console.log('Success!')
          console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
      const { data, error } = await supabase
        .from('profiles')
        .update([
          {
            displayPicture: this.formData.profile_link,
            banner: this.formData.banner_link
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
        var image = document.getElementById('profile')
        image.src = this.formData.profile_picture
      } else {
        this.formData.banner = URL.createObjectURL(e.target.files[0])
        this.formData.banner_file = e.target.files[0]
        var image = document.getElementById('banner')
        image.src = this.formData.banner
      }
    }
  },
  async created() {
    const supabase = useSupabaseClient()
    var supabaseSession = await supabase.auth.getSession()
    var userSession = null
    var userId = ''

    if (!supabaseSession.data.session) {
      this.isLoggedIn = false
    } else {
      this.isLoggedIn = true
      userSession = supabaseSession.data.session.user
      userId = userSession.id
      const userRequest = await useFetch(`/api/users/session/${userId}`)
      const userData = userRequest.data.value.users[0]
      this.name = userData.name
      this.user.name = userData.name
      this.user.dpLink = userData.displayPicture
      this.user.bannerLink = userData.banner
      this.user.description = userData.description
      this.user.city = userData.city
      this.user.country = userData.country
      this.user.province = userData.province

      this.formData.name = userData.name
      this.formData.description = userData.description
      this.formData.city = userData.city
      this.formData.country = userData.country
      this.formData.province = userData.province
    }
    this.doneLoading = true
  }
}