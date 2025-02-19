import { createModalController } from '@/factories/modalFactory'

export default {
  mixins: [createModalController()],
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

      if (error) {
        this.passwordText = 'Email or password is incorrect'
      } else {
        this.$emit('login')
        this.closeModal()
      }
    }
  }
}
