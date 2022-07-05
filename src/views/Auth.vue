<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full">
        <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img alt="Light It Logo" class="mx-auto" src="@/assets/lightItLogo.png" width="125" height="125"/>

          <HelloLightIt msg="Welcome to my code challenge!"/>

          <nav class="flex justify-center">
            <RouterLink class="px-7 py-3 rounded" to="/login">Login</RouterLink>
            <RouterLink class="px-7 py-3 rounded" to="/register">Register</RouterLink>
          </nav>
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import HelloLightIt from '@/components/HelloLightIt.vue'
</script>

<style>
@import '/src/assets/base.css';

a {
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: rgb(167 139 250);
  }
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>