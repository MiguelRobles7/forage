<template>
    <div>
        <NavbarDefault v-if="this.$route.name !== 'index'"></NavbarDefault>
        <NuxtPage></NuxtPage>
        <Footer></Footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>