<template>
    <div class="backdrop">
        <div class="loading">
            Loading lang idol...
        </div>
    </div>
</template>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    background: black;
    width: 100vw;
    height: 100vh;
    z-index: 50;
}
.loading {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; 
    align-items: center;
}
</style>