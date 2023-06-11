<script setup>
// Imports here
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <br />
        <RouterLink to="/about">About</RouterLink>
        <br />
        <RouterLink to="/main">Index</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <h1 className="text-3xl font-bold underline">Hello world!</h1>
  </main>
  <RouterView />
</template>
