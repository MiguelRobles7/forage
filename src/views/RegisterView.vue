<template>
  <main>
    <LogRegModal type="Create" typeText="an account.">
      <template v-slot:content>
        <form @submit.prevent="nextPage">
          <div class="flex-col">
            <div v-if="currPage === 1">
              <div class="input-parent">
                <img src="../assets/LoginRegister/Email.png" />
                <input
                  v-model="email"
                  type="Email"
                  @focus="hidePlaceholder1"
                  @blur="showPlaceholder1"
                  placeholder="Email"
                  class="input-def"
                  required
                />
              </div>
              <!-- <label v-if="emailText">{{ emailText }}</label> -->

              <div class="input-parent">
                <img src="../assets/LoginRegister/Key.png" />
                <input
                  v-model="password"
                  type="Password"
                  @focus="hidePlaceholder1"
                  @blur="showPlaceholder1"
                  placeholder="Password"
                  class="input-def"
                  required
                />
              </div>
              <!-- <label v-if="passwordText">{{ passwordText }}</label> -->

              <div class="input-parent">
                <img src="../assets/LoginRegister/Lock.png" />
                <input
                  id="confirm"
                  v-model="passwordConfirm"
                  type="Password"
                  @focus="hidePlaceholder1"
                  @blur="showPlaceholder1"
                  placeholder="Confirm Password"
                  class="input-def"
                  required
                />
              </div>
            </div>
            <div v-if="currPage === 2">Wow next page!</div>

            <button class="modal-button">
              <span v-if="currPage === 1 || currPage === 2">NEXT PAGE →</span
              ><span v-else>Confirm</span>
            </button>

            <div>
              <div>Already have an account?</div>
              <RouterLink to="/login" style="color: #2a7e58; text-decoration: underline">
                Log in here
              </RouterLink>
            </div>
          </div>
        </form>
      </template>
    </LogRegModal>
  </main>
</template>

<script>
import LogRegModal from '../components/LogRegModal.vue'
export default {
  components: {
    LogRegModal
  },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      username: '',
      street: '',
      city: '',
      country: '',
      zip: '',
      desc: '',
      image: '',
      currPage: 1
    }
  },
  methods: {
    hidePlaceholder1(e) {
      e.target.placeholder = ''
    },
    showPlaceholder1(e) {
      if (e.target.id === 'confirm') e.target.placeholder = 'Confirm Password'
      else
        e.target.type === 'email'
          ? (e.target.placeholder = 'Email')
          : (e.target.placeholder = 'Password')
    },
    nextPage() {
      this.currPage++
    }
  }
}
</script>

<style scoped>
input {
  background-color: transparent;
}
</style>
