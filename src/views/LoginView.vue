<script>
import LogRegModal from '../components/LogRegModal.vue';

export default {
  components: {
    LogRegModal
  }
}
</script>

<template>
  <main>
    <LogRegModal type="Login" typeText="your account.">

    </LogRegModal>
  </main>
</template>

<style scoped>
.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
}
</style>