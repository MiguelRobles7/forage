export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      province: '',
      city: '',
      country: '',
      desc: '',
      passwordText: '',
      currPage: 1
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    hidePlaceholder(e) {
      e.target.placeholder = ''
    },
    showPlaceholder(e) {
      switch (e.target.id) {
        case 'email':
          e.target.placeholder = 'Email'
          break
        case 'confirm':
          e.target.placeholder = 'Confirm Password'
          break
        case 'password':
          e.target.placeholder = 'Password'
          break
        case 'username':
          e.target.placeholder = 'Display Name'
          break
        case 'province':
          e.target.placeholder = 'Province'
          break
        case 'city':
          e.target.placeholder = 'City'
          break
        case 'country':
          e.target.placeholder = 'Country'
          break
      }
    },
    async nextPage() {
      if (this.currPage === 1) {
        if (this.password !== this.passwordConfirm) {
          this.passwordText = 'Passwords do not match'
          return
        }
      }
      if (this.currPage === 3) {
        console.log(this.username)
        const supabase = useSupabaseClient()
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              username: this.username,
              desc: this.desc,
              country: this.country,
              province: this.province,
              city: this.city
            }
          }
        })
        if (error) {
          console.log(error)
        } else {
          alert('Registered! Please check your email for verification')
        }
        this.closeModal()
      } else this.currPage++
    }
  }
}
