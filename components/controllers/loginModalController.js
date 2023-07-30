export default {
  data() {
    return {
      email: '',
      password: '',
      keepLoggedIn: false,
      emailText: '',
      passwordText: ''
    }
  },
  methods: {
    async signInWithEmail() {
      const supabase = useSupabaseClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password
      })
      console.log(error)
      if (error) {
        this.passwordText = 'Email or password is incorrect'
      } else {
        this.$emit('login')
        this.$emit('close')
      }
    },
    hidePlaceholder(e) {
      e.target.placeholder = ''
    },
    showPlaceholder(e) {
      e.target.type === 'email' ? (e.target.placeholder = 'Email') : (e.target.placeholder = 'Password')
    },
    toggleKeepLogin() {
      this.keepLoggedIn = !this.keepLoggedIn
    }
  }
}
