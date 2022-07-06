<template>
  <CardForm
    :title="title"
    :submitLabel="submitLabel"
    :loading="loading"
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

    <template v-slot:footer>
        <Button
          class="p-button-secondary"
          :disabled="loading"
          label="Refresh Symptoms"
          @click="refreshSymptoms"
        >
        </Button>
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
  import qs from 'qs';
  import useAuthAxios from "../composables/useAuthAxios";
  import {useToast} from "primevue/usetoast";

  const axios = useAuthAxios();
  const toast = useToast();

  // ref fields
  const title = ref('Get Diagnostic');
  const submitLabel = ref('Consult Diagnostics');
  const loading = ref(false);
  const fields = reactive({
    symptoms: [],
  });
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
      },
      paramsSerializer: params => {
        return qs.stringify(params)
      }
    }).then((resp) => {
      const response = resp.data;
      if (response.data.length === 0) {
        toast.add({
          severity: 'warn',
          summary: 'Diagnostics information',
          detail: 'There are no diagnoses available for the selected symptoms. Please select others.',
          life: 3000
        });
      }
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
      toast.add({severity: 'error', summary: 'Validation Error', detail: error.response.data.message, life: 3000});
    });
  }

  const getSymptoms = async () => {
    await axios.get(`http://localhost/api/getSymptoms`).then((resp) => {
      const response = resp.data;
      if (response.metadata.code === 200) {
        symptoms.value = response.data;
      }
    }).catch((error) => {
      toast.add({severity: 'error', summary: 'Validation Error', detail: error.response.data.message, life: 3000});
    });
  }

  const refreshSymptoms = async () => {
    await axios.patch(`http://localhost/api/clearSymptoms`).then((resp) => {
      const response = resp.data;
      if (response.metadata.code === 200 && response.data.cleared) {
        getSymptoms().then(() => {
          toast.add({severity: 'success', summary: 'Symptoms list refreshed', detail: '', life: 3000});
        });
      }
    }).catch((error) => {
      toast.add({severity: 'error', summary: 'Validation Error', detail: error.response.data.message, life: 3000});
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