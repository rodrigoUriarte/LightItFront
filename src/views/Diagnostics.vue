<template>
  <CardForm
    :title="title"
    :submitLabel="submitLabel"
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
              class="w-full"
            />
            <label>Select your symptoms</label>
          </span>
        </div>

      </div>
    </template>
  </CardForm>
  <Card
    v-if="diagnostics.length > 0"
    class="mt-4">
    <template #title>
      Diagnostics Information
    </template>
    <template #content>
      <Chart type="bar" :data="basicData" :options="basicOptions"/>
    </template>
  </Card>
</template>

<script setup>
  import CardForm from "@/components/CardForm.vue";
  import {onMounted, reactive, ref} from "vue";
  import {useAuthUser} from "../stores/auth/useAuthUser";
  import qs from 'qs';
  import useAuthAxios from "../composables/useAuthAxios";

  const authUser = useAuthUser();
  const axios = useAuthAxios();

  // ref fields
  const title = ref('Get Diagnostic');
  const submitLabel = ref('Consult Diagnostics');
  const loading = ref(false);
  const fields = reactive({
    symptoms: [],
    gender: authUser.gender,
    birthday: authUser.birthday,
  });
  const validationMessage = ref('');
  const symptoms = ref([]);
  const diagnostics = ref([]);

  //chart data
  const basicData = ref({
    labels: ['Diagnosis Accuracy (%)'],
    datasets: null,
  });
  const basicOptions = ref({
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: true,
  });

  //functions
  const getDiagnostics = async () => {
    await axios.get(`http://localhost/api/getDiagnostics`, {
      params: {
        symptoms: fields.symptoms,
        gender: fields.gender,
        birthday: fields.birthday,
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then((resp) => {
      const response = resp.data;
      if (response.metadata.code === 200) {
        diagnostics.value = response.data;
        basicData.value.datasets = diagnostics.value.map((diagnostic) => {
          return {
            label: diagnostic.name,
            backgroundColor: `rgb(${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0},${Math.random() * (255 - 0) + 0})`,
            data: [diagnostic.accuracy],
          }
        });
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  const getSymptoms = async () => {
    await axios.get(`http://localhost/api/getSymptoms`).then((resp) => {
      const response = resp.data;
      if (response.metadata.code === 200) {
        symptoms.value = response.data;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const save = () => {
    loading.value = true;
    getDiagnostics();
    loading.value = false;
  }

  onMounted(() => {
    getSymptoms();
  })

</script>

<style scoped>

</style>