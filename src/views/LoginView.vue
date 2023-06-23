<template>
    <LogRegModal type="Login" typeText="your account.">
      <template v-slot:content>
        <form @submit.prevent="submitForm">
          <div class="flex-col">
            <div class="input-parent">
              <img src="../assets/LoginRegister/Email.png" />
              <input
                v-model="email"
                type="Email"
                @focus="hidePlaceholder"
                @blur="showPlaceholder"
                placeholder="Email"
                class="input-def input"
                required
              />
            </div>
            <label v-if="emailText">{{ emailText }}</label>

            <div class="input-parent">
              <img src="../assets/LoginRegister/Key.png" />
              <input
                v-model="password"
                type="Password"
                @focus="hidePlaceholder"
                @blur="showPlaceholder"
                placeholder="Password"
                class="input-def input"
                required
              />
            </div>
            <label v-if="passwordText">{{ passwordText }}</label>

            <div class="margin-top keep-signed">
              <input v-model="keepLoggedIn" type="checkbox" />
              <label @click="toggleKeepLogin">Keep me logged in</label>
            </div>

            <button class="modal-button">LOGIN</button>

            <div class="font-default margin-top">
              <div>Don't have an account?</div>
              <RouterLink to="/register" class="">Sign up here</RouterLink>
            </div>
          </div>
        </form>
      </template>
    </LogRegModal>
</template>

<script>
import LogRegModal from '../components/LogRegModal.vue'
import { RouterLink } from 'vue-router'
export default {
  components: {
    LogRegModal
  },
  data() {
    return {
      accounts: [
        { email: 'rafa@forage.com', password: 'pogi' },
        { email: 'jd@forage.com', password: 'pogi' },
        { email: 'don@forage.com', password: 'pogi' },
        { email: 'miguel@forage.com', password: 'pogi' }
      ],
      email: '',
      password: '',
      keepLoggedIn: false,
      emailText: '',
      passwordText: ''
    }
  },
  methods: {
    submitForm() {
      this.emailText = ''
      this.passwordText = ''
      const emailExists = this.accounts.find(
        (account) => account.email.toLowerCase() === this.email
      )
      if (!emailExists) {
        this.emailText = 'Account does not exist!'
      } else {
        const passwordMatch = this.accounts.find((account) => account.password === this.password)
        if (!passwordMatch) {
          this.passwordText = 'Password is incorrect!'
        } else {
          this.$router.push('/home')
        }
      }
    },
    hidePlaceholder(e) {
      e.target.placeholder = ''
    },
    showPlaceholder(e) {
      e.target.type === 'email'
        ? (e.target.placeholder = 'Email')
        : (e.target.placeholder = 'Password')
    },
    toggleKeepLogin() {
      this.keepLoggedIn = !this.keepLoggedIn
    }
  }
}
</script>

<style scoped>
input {
  background-color: transparent;
}
.border {
  border-bottom: 1px solid #1a2228;
  margin-bottom: 1rem;
  max-width: 25vw;
}
.input {
  background-color: transparent;
  min-width: 100%;
  outline: none;
}
.margin-top {
  margin-top: 10px;
}
button {
  margin-top: 20px;
}
.keep-signed {
  display: flex;
  gap: 10px;
}
</style>
