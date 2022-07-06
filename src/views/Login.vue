<template>
  <div class="flex justify-center">
    <div class=" w-9/12 p-6 rounded-lg shadow-2xl shadow-indigo-500/60 mt-5 lg:mt-0">

      <div class="flex flex-row items-center justify-center">
        <p class="text-lg mb-0 mr-4">Sign in with credentials</p>
      </div>

      <div
        class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
      >
      </div>

      <div class="mb-6">
        <input
          v-model="credentials.email"
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded "
          placeholder="Email address"
        />
      </div>

      <div class="mb-6">
        <input
          v-model="credentials.password"
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded"
          placeholder="Password"
        />
      </div>

      <div class="text-center lg:text-left">
        <button
          type="button"
          class="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded"
          :class="submittable"
          @click="login()"
        >
          Login
        </button>
        <p class="text-sm font-semibold mt-2 pt-1 mb-0">
          Don't have an account?
          <RouterLink class="px-3 py-3 rounded hover:bg-lightit hover:text-white" to="/register">Register</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

  import {reactive, computed} from 'vue'
  import {useAuthUser} from '@/stores/auth/useAuthUser';
  import {useToast} from "primevue/usetoast";

  const authUser = useAuthUser();
  const toast = useToast();
  const credentials = reactive({
    email: "",
    password: "",
  });
  const submittable = computed(() => ({
    'bg-indigo-600 hover:bg-indigo-400': credentials.email !== "" && credentials.password !== "",
    'bg-gray-400': credentials.email === "" || credentials.password === "",
  }));

  const login = async () => {
    authUser.login(credentials).then((error) => {
      if (error) {
        toast.add({severity:'error', summary: 'Login status', detail:error.response.data.message, life: 3000});
      } else {
        toast.add({severity:'success', summary: 'Login status', detail:'Successfully loggedIn', life: 3000});
      }
    });

  }

</script>

