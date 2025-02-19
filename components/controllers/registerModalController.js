import { createModalController } from '@/factories/modalFactory'

export default {
  mixins: [createModalController()], // Use the modal factory
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
    async nextPage() {
      if (this.currPage === 1) {
        if (this.password !== this.passwordConfirm) {
          this.passwordText = 'Passwords do not match'
          return
        }
      }
      if (this.currPage === 3) {
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
        this.closeModal() // Inherited from modalFactory.js
      } else {
        this.currPage++
      }
    }
  }
}
