<script setup>
// Imports here
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>
<style>
::-webkit-scrollbar {
  width: 2px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
