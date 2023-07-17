<template>
  <LoginRegisterSlot type="Create" typeText="an account.">
    <template v-slot:content>
      <form @submit.prevent="nextPage">
        <div class="flex-col">
          <div v-if="currPage === 1">
            <div class="input-parent">
              <img src="~/assets/icons/Email.png" />
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
              <img src="~/assets/icons/Key.png" />
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

            <div class="input-parent">
              <img src="~/assets/icons/Lock.png" />
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
            <label v-if="passwordText" class="input-def">{{ passwordText }}</label>
          </div>
          <div v-if="currPage === 2">
            <div class="input-parent">
              <img src="~/assets/icons/user_black.svg" />
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
              <img src="~/assets/icons/location_black.svg" />
              <label class="input-def">Address (optional)</label>
            </div>
            <div class="addrInput">
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
                    id="province"
                    v-model="province"
                    type="text"
                    @focus="hidePlaceholder"
                    @blur="showPlaceholder"
                    placeholder="Province"
                    class="input-def"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="currPage === 3">
            <div class="labels">
              <img src="~/assets/icons/Note.svg" />
              <label class="input-def">Describe yourself (optional)</label>
            </div>
            <!-- Textbox input -->
            <textarea
              id="desc"
              v-model="desc"
              type="text"
              @focus="hidePlaceholder"
              @blur="showPlaceholder"
              class="input-def"
            ></textarea>

            <!-- <div class="labels margin-top">
              <img src="~/assets/icons/camera_black.svg" />
              <label class="input-def">Upload an image (optional)</label>
            </div>
            <div class="img margin-top">
              <img src="~/assets/icons/plus.svg" />
            </div> -->
          </div>

          <button class="modal-button">
            <span v-if="currPage === 1 || currPage === 2">NEXT PAGE →</span>
            <span v-else>CONFIRM</span>
          </button>

          <div class="margin-top">
            <div>Already have an account?</div>
            <!--TODO: Refactor Login Register Structure-->
            <span @click="this.$emit('goLog')" style="color: #2a7e58; text-decoration: underline; font-weight: bold; cursor: pointer;">
              Log in here
            </span>
          </div>
        </div>
      </form>
    </template>
  </LoginRegisterSlot>
</template>

<script>
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
        console.log(this.username);
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
          console.log(error);
        }
        else {
          alert('Registered! Please check your email for verification');
        }
        this.closeModal()
      }
      else
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
textarea {
  margin-top: 5px;
  resize: none;
  min-width: 100%;
  background-color: transparent;
  border: 2px solid #000;
  min-height: 5em;
}
.margin-top {
  margin-top: 10px;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: fit-content;
  max-height: fit-content;
  border: 2px solid #000;
  cursor: pointer;
}
.img img {
  padding: 15px;
}
button {
  margin-top: 20px;
}
</style>
