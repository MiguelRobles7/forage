<template>
  <main>
    <LogRegModal type="Login" typeText="your account.">
      <template v-slot:content>
        <form @submit.prevent="submitForm">
          <div class=" flex flex-col">
            <div class="flex items-start border">
              <img src="../assets/LoginRegister/Email.png">
              <input v-model="email" type="Email" @focus="hidePlaceholder" @blur="showPlaceholder" placeholder="Email" class=" placeholder-inherit pl-1" required>
            </div>
            <label v-if="emailText">{{ emailText }}</label>
  
            <div class="flex items-start border">
              <img src="../assets/LoginRegister/Key.png">
              <input v-model="password" type="Password" @focus="hidePlaceholder" @blur="showPlaceholder" placeholder="Password" class=" placeholder-inherit pl-1"  required>
            </div>
            <label v-if="passwordText">{{ passwordText }}</label>
  
            <div>
              <input v-model="keepLoggedIn" type="checkbox">
              <label class="font-TTInterphases pl-2 select-none" @click="toggleKeepLogin">Keep me logged in</label>
            </div>

            <button class=" rounded-2xl bg-[#1A2228] max-w-min text-white uppercase font-SpaceGrotesk p-2 pl-5 pr-5 text-xs mb-5">Login</button>

            <div class=" font-TTInterphases">
              <div>Don't have an account?</div>
              <RouterLink to="/register" class=" text-[#2A7E58] underline">Sign up here</RouterLink>
            </div>
          </div>
        </form>
      </template>
    </LogRegModal>
  </main>
</template>

<script>
import LogRegModal from '../components/LogRegModal.vue';
import { RouterLink } from 'vue-router';
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
      this.emailText = '';
      this.passwordText = '';
      const emailExists = this.accounts.find(account => account.email.toLowerCase() === this.email);
      if (!emailExists) {
        this.emailText = 'Account does not exist!';
      }
      else {
        const passwordMatch = this.accounts.find(account => account.password === this.password);
        if (!passwordMatch) {
          this.passwordText = 'Password is incorrect!';
        }
        else {
          this.$router.push('/home');
        }
      }
    },
    hidePlaceholder(e) {
      e.target.placeholder = '';
    },
    showPlaceholder(e) {
      (e.target.type === 'email') ? e.target.placeholder = 'Email' : e.target.placeholder = 'Password';
    },
    toggleKeepLogin() {
      this.keepLoggedIn = !this.keepLoggedIn;
    }
  }
}
</script>

<style scoped>
.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
input {
  background-color: transparent;
}
.border {
  border-bottom: 1px solid #1A2228;
  margin-bottom: 1rem;
  max-width: 25vw;
}
</style>