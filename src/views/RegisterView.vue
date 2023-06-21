<template>
  <main>
    <LogRegModal type="Create" typeText="an account.">
      <template v-slot:content>
        <form @submit.prevent="nextPage">
          <div class=" flex flex-col">
            <div v-if="currPage === 1">
              <div class="flex items-start border">
              <img src="../assets/LoginRegister/Email.png">
              <input v-model="email" type="Email" @focus="hidePlaceholder1" @blur="showPlaceholder1" placeholder="Email" class=" placeholder-inherit pl-1 w-full outline-transparent focus:outline-none" required>
              </div>
              <!-- <label v-if="emailText">{{ emailText }}</label> -->
    
              <div class="flex items-start border">
                <img src="../assets/LoginRegister/Key.png">
                <input v-model="password" type="Password" @focus="hidePlaceholder1" @blur="showPlaceholder1" placeholder="Password" class=" placeholder-inherit pl-1 w-full outline-transparent focus:outline-none"  required>
              </div>
              <!-- <label v-if="passwordText">{{ passwordText }}</label> -->

              <div class="flex items-start border">
                <img src="../assets/LoginRegister/Lock.png">
                <input id="confirm" v-model="passwordConfirm" type="Password" @focus="hidePlaceholder1" @blur="showPlaceholder1" placeholder="Confirm Password" class=" placeholder-inherit pl-1 w-full focus:outline-none"  required>
              </div>
            </div>
            <div v-if="currPage === 2">
              Wow next page!
            </div>

            <button class=" rounded-2xl bg-[#1A2228] max-w-fit text-white uppercase font-SpaceGrotesk p-2 pl-5 pr-5 text-xs mb-5"><span v-if="currPage === 1 || currPage === 2">Next Page →</span><span v-else>Confirm</span></button>

            <div class=" font-TTInterphases">
              <div>Already have an account?</div>
              <RouterLink to="/login" class=" text-[#2A7E58] underline">Log in here</RouterLink>
            </div>
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
      e.target.placeholder = '';
    },
    showPlaceholder1(e) {
      if (e.target.id === 'confirm')
      e.target.placeholder = 'Confirm Password';
      else
      (e.target.type === 'email') ? e.target.placeholder = 'Email' : e.target.placeholder = 'Password';
    },
    nextPage() {
      this.currPage++;
    }
  }
}
</script>

<style scoped>
input {
  background-color: transparent;
}
.border {
  border-bottom: 1px solid #1A2228;
  margin-bottom: 1rem;
  max-width: 25vw;
  border-width: 0 0 1px 0;
}
</style>
