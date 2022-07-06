<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="text-violet-600">{{ msg }}</h1>
    <h3>
      Developed with:
      <a target="_blank" href="https://vitejs.dev/" class="hover:bg-lightit hover:text-white">Vite</a> +
      <a target="_blank" href="https://vuejs.org/" class="hover:bg-lightit hover:text-white">Vue 3</a> +
      <a target="_blank" href="https://laravel.com/" class="hover:bg-lightit hover:text-white">Laravel</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

</style>
