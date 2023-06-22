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
                  id="email"
                  v-model="email"
                  type="Email"
                  @focus="hidePlaceholder"
                  @blur="showPlaceholder"
                  placeholder="Email"
                  class="input-def"
                  required
                />
              </div>
              <!-- <label v-if="emailText">{{ emailText }}</label> -->

              <div class="input-parent">
                <img src="../assets/LoginRegister/Key.png" />
                <input
                  id="password"
                  v-model="password"
                  type="Password"
                  @focus="hidePlaceholder"
                  @blur="showPlaceholder"
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
                  @focus="hidePlaceholder"
                  @blur="showPlaceholder"
                  placeholder="Confirm Password"
                  class="input-def"
                  required
                />
              </div>
            </div>
            <div v-if="currPage === 2">
              <div class="input-parent">
                <img src="../assets/LoginRegister/User.svg" />
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  @focus="hidePlaceholder"
                  @blur="showPlaceholder"
                  placeholder="Display Name"
                  class="input-def"
                  required
                />
              </div>
              <div class="labels">
                <img src="../assets/LoginRegister/Location.svg" />
                <label class="input-def">Address (optional)</label>
              </div>
              <div class="addrInput">
                <div class="input-parent">
                  <input
                    id="street"
                    v-model="street"
                    type="text"
                    @focus="hidePlaceholder"
                    @blur="showPlaceholder"
                    placeholder="Street Address"
                    class="input-def"
                  />
                </div>
                <div class="input-parent">
                  <input
                    id="city"
                    v-model="city"
                    type="text"
                    @focus="hidePlaceholder"
                    @blur="showPlaceholder"
                    placeholder="City"
                    class="input-def"
                  />
                </div>
                <div class="counZip">
                  <div class="input-parent">
                    <input
                      id="country"
                      v-model="country"
                      type="text"
                      @focus="hidePlaceholder"
                      @blur="showPlaceholder"
                      placeholder="Country"
                      class="input-def"
                    />
                  </div>
                  <div class="input-parent">
                    <input
                      id="zip"
                      v-model="zip"
                      type="text"
                      @focus="hidePlaceholder"
                      @blur="showPlaceholder"
                      placeholder="ZIP Code"
                      class="input-def"
                    />
                  </div>
                </div>
              </div>

            </div>


            <button class="modal-button">
              <span v-if="currPage === 1 || currPage === 2">NEXT PAGE →</span>
              <span v-else>Confirm</span>
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
      currPage: 2
    }
  },
  methods: {
    hidePlaceholder(e) {
      e.target.placeholder = ''
    },
    showPlaceholder(e) {
      switch (e.target.id) {
        case 'email':
          e.target.placeholder = 'Email'
          break;
          case 'confirm':
            e.target.placeholder = 'Confirm Password'
            break;
          case 'password':
            e.target.placeholder = 'Password'
            break;
          case 'username':
            e.target.placeholder = 'Display Name'
            break;
          case 'street':
            e.target.placeholder = 'Street Address'
            break;
          case 'city':
            e.target.placeholder = 'City'
            break;
          case 'country':
            e.target.placeholder = 'Country'
            break;
          case 'zip':
            e.target.placeholder = 'ZIP Code'
            break;
      }
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
  min-width: 100%;
  outline: none;
}

.labels {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}
.addrInput {
  margin-left: 40px;
}
.counZip {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: left;

}
.counZip input {
  max-width: 155px;
}
</style>
