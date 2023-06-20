<template>
  <main>
    <LogRegModal type="Create" typeText="an account.">
      <template v-slot:content>
        
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
      image: ''
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
