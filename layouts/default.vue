<template>
    <div>
        <NavbarHome v-if="path === '/'" @login="toggleLogin" @logout="toggleLogin" :isLoggedIn="isLoggedIn"></NavbarHome>
        <NavbarDefault v-else :isLoggedIn="isLoggedIn" @login="toggleLogin" @logout="toggleLogin"></NavbarDefault>
        <NuxtPage></NuxtPage>
        <Footer></Footer>
    </div>
</template>

<script setup>
const route = useRoute();
const path = computed(() => route.path);
const supabase = useSupabaseClient();
var supabaseSession = ref(await supabase.auth.getSession());
var isLoggedIn = ref();
var userData = ref(null);

if(!supabaseSession.value.data.session) {
    isLoggedIn.value = false;
} else {
    isLoggedIn.value = true;
    userData.value = supabaseSession.value.data.session.user;
}

async function toggleLogin() {
    isLoggedIn.value = !isLoggedIn.value;

    if(isLoggedIn.value) {
        supabaseSession.value = await supabase.auth.getSession();
        userData.value = supabaseSession.value.data.session.user;
    }
    else {
        userData.value = null;
    }
}
</script>

<style lang="scss" scoped>

</style>