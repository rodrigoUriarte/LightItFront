<template>
  <CardForm
    title="Get Diagnosis"
    :backRoute="route"
    :loading="loading"
    :validationMessage="validationMessage"
    v-on:save="save"
  >
    <template v-slot:content>
      <div class="formgrid grid">

        <div class="field col-12">
          <span class="p-float-label">
            <MultiSelect
              v-model="fields.symptoms"
              :options="symptoms"
              :filter="true"
              optionLabel="name"
              optionValue="id"
              display="chip"
              style="width: 100%"
              v-tooltip.bottom="'Select your symptoms'"
            />
            <label>Symptoms</label>
          </span>
        </div>

      </div>
    </template>
  </CardForm>
</template>

<script setup>
  import CardForm from "@/components/CardForm.vue";
  import {inject, onMounted, reactive, ref} from "vue";
  import {useAuthUser} from "../stores/auth/useAuthUser";
  import qs from 'qs';

  const $axios = inject('axios');
  const authUser = useAuthUser();

  // ref fields
  const route = ref('/diagnosis');
  const loading = ref(false);
  const fields = reactive({
    symptoms: [],
    gender: authUser.gender,
    birthday: authUser.birthday,
  });
  const validationMessage = ref('');
  const symptoms = ref([]);

  //functions
  const getDiagnosis = async () => {
    await $axios.get(`http://localhost/api/getDiagnosis`, {
      params: {
        symptoms: fields.symptoms,
        gender: fields.gender,
        birthday: fields.birthday,
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then((resp) => {
      console.log(resp);
      const response = resp.data;
      if (response.metadata.code === 200) {
        //symptoms.value = response.data;
        //this.$toast.add({severity:'success', summary: 'Login status', detail:'Successfully loggedIn', life: 3000});
      }
    }).catch((error) => {
      console.log(error)
      //this.$toast.add({severity:'error', summary: 'Register status', detail:error.response.data.message, life: 3000});
    });
  }

  const getSymptoms = async () => {
    await $axios.get(`http://localhost/api/getSymptoms`).then((resp) => {
      console.log(resp);
      const response = resp.data;
      if (response.metadata.code === 200) {
        symptoms.value = response.data;
        //this.$toast.add({severity:'success', summary: 'Login status', detail:'Successfully loggedIn', life: 3000});
      }
    }).catch((error) => {
      this.$toast.add({severity: 'error', summary: 'Register status', detail: error.response.data.message, life: 3000});
    });
  }

  const save = () => {
    loading.value = true;
    console.log(fields);
    getDiagnosis();
    loading.value = false;

  }


  onMounted(() => {
    getSymptoms();
  })

</script>

<style scoped>

</style>