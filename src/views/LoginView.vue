<template>
  <main>
    <LogRegModal type="Login" typeText="your account.">
      <template v-slot:content>
        <form @submit.prevent="submitForm">
          <div class=" flex flex-col">
            <label>Email</label>
            <input v-model="email" type="email" required>
            <label v-if="emailText">{{ emailText }}</label>
  
            <label>Password</label>
            <input v-model="password" type="password" required>
            <label v-if="passwordText">{{ passwordText }}</label>
  
            <div>
              <input v-model="keepLoggedIn" type="checkbox">
              <label>Keep me logged in</label>
            </div>

            <button>Login</button>
          </div>
        </form>
      </template>
    </LogRegModal>
  </main>
</template>

<script>
import LogRegModal from '../components/LogRegModal.vue';

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
  max-width: 25vw;
  margin-bottom: 1rem;

}
</style>