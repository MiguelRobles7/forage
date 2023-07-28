<template>
  <div class="backdrop">
    <div class="center-load" style="display: flex; flex-direction: column">
      <img class="loading-gif" src="/assets/images/loading.gif" alt="" />
      <div class="loading title">Loading Page</div>
      <div>Please allow up to 20 seconds while we're getting things ready for you</div>
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
  align-items: center;
  justify-content: center;
}
.loading-gif {
  max-width: 15rem;
  max-height: 15rem;
  justify-content: center;
  align-self: center;
}
.loading {
  display: flex;
  justify-content: center;
  align-self: center;
  font-family: TTInterphases;
  margin: 0;
}
.center-load {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
