<template>
  <div class="flex justify-center">
    <div class=" w-9/12 p-6 rounded-lg shadow-2xl shadow-indigo-500/60 mt-5 lg:mt-0">

      <div class="flex flex-row items-center justify-center">
        <p class="text-lg mb-0 mr-4">Sign Up</p>
      </div>

      <div
        class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
      >
      </div>

      <div class="mb-6">
        <input
          v-model="credentials.name"
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded "
          placeholder="Name"
        />
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

      <div class="mb-6">
        <input
          v-model="credentials.password_confirmation"
          type="password"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded"
          placeholder="Password Confirmation"
        />
      </div>

      <div class="mb-6">
        <select
          v-model="credentials.gender"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded "
        >
          <option disabled value="">Select a gender</option>
          <option v-for="gender in genders" :value="gender.id">{{ gender.name }}</option>
        </select>
      </div>

      <div class="mb-6">
        <input
          v-model="credentials.birthday"
          type="text"
          class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white border border-solid border-indigo-300 rounded "
          placeholder="Birthday"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
        />
      </div>

      <div class="text-center lg:text-left">
        <button
          type="button"
          class="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded "
          :class="submittable"
          @click="register()"
        >
          Register
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>

  import {reactive, ref, computed} from 'vue'
  import {useAuthUser} from '@/stores/auth/useAuthUser';
  import {useToast} from "primevue/usetoast";

  const authUser = useAuthUser();
  const toast = useToast();

  const genders = ref([
    {
      id: "female",
      name: "Female",
    },
    {
      id: "male",
      name: "Male",
    },
  ]);
  const credentials = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    birthday: "",
  });
  const submittable = computed(() => ({
    'bg-indigo-600 hover:bg-indigo-400':
      credentials.name &&
      credentials.email &&
      credentials.password &&
      credentials.password_confirmation &&
      credentials.gender &&
      credentials.birthday,
    'bg-gray-400':
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.password_confirmation ||
      !credentials.gender ||
      !credentials.birthday,
  }));

  const register = () => {
    authUser.register(credentials).then((error) => {
      if (error) {
        toast.add({severity:'error', summary: 'Register status', detail:error.response.data.message, life: 3000});
      } else {
        toast.add({severity:'success', summary: 'Register status', detail:'Successfully registered', life: 3000});
      }
    });

  }

</script>

