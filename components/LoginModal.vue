<script src="./controllers/loginModalController.js" />

<template>
  <LoginRegisterSlot type="Login" typeText="your account.">
    <template v-slot:content>
      <form @submit.prevent="signInWithEmail">
        <div class="flex-col">
          <div class="input-parent">
            <img src="~/assets/icons/Email.png" />
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
          <!-- <label v-if="emailText">{{ emailText }}</label> -->

          <div class="input-parent">
            <img src="~/assets/icons/Key.png" />
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

          <button class="modal-button">LOGIN</button>

          <div class="font-default margin-top">
            <div>Don't have an account?</div>
            <span
              @click="this.$emit('goReg')"
              style="color: #2a7e58; text-decoration: underline; cursor: pointer; font-weight: bold"
            >
              Sign up here</span
            >
          </div>
        </div>
      </form>
    </template>
  </LoginRegisterSlot>
</template>

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
