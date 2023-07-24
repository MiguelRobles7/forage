<template>
  <div>
    <NavbarHome v-if="isHome"></NavbarHome>
    <NavbarDefault v-else></NavbarDefault>
    <NuxtPage></NuxtPage>
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  async created() {},
  computed: {
    isHome() {
      const route = useRoute()
      const path = route.path
      return path === '/'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
