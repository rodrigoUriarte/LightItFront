<template>
  <div>
    <DataTable
      :value="historicDiagnostics"
      :lazy="true"
      :paginator="true"
      :rows="10"
      ref="dt"
      dataKey="id"
      :totalRecords="totalRecords"
      :loading="loading"
      responsiveLayout="stack"
      @page="onPage($event)"
    >
      <Column field="name" header="Name"/>
      <Column field="accuracy" header="Accuracy"/>
      <Column field="confirmed" header="Diagnosis Confirmed">
        <template #body="slotProps">
          <Tag
            class="mr-2"
            :severity="slotProps.data.confirmed?'success':'warning'"
            :value="slotProps.data.confirmed?'Confirmed':'Not Confirmed'"
          ></Tag>
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button
            icon="pi pi-check"
            label="Confirm Diagnosis"
            class="p-button-rounded p-button-success mr-2"
            @click="confirmDiagnosis(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
  import {ref, onMounted} from 'vue';
  import useAuthAxios from "../composables/useAuthAxios";
  import {useAuthUser} from "../stores/auth/useAuthUser";
  import qs from "qs";

  export default {
    setup() {
      onMounted(() => {
        loading.value = true;

        lazyParams.value = {
          first: 0,
          rows: dt.value.rows,
        };

        loadLazyData();
        loading.value = false;

      })

      const axios = useAuthAxios();
      const authUser = useAuthUser();

      const dt = ref();
      const loading = ref(false);
      const totalRecords = ref(0);
      const historicDiagnostics = ref();
      const lazyParams = ref({});

      const loadLazyData = () => {

        setTimeout(async () => {
          getHistoricDiagnostics()
        }, Math.random() * 1000 + 250);
      };

      const confirmDiagnosis = async (data) => {

        await axios.patch(`http://localhost/api/confirm_diagnosis/${data.id}`).then((resp) => {
          const response = resp.data;
          if (response.metadata.code === 200) {
            data.confirmed = response.data.confirmed;
          }
        }).catch((error) => {
          console.log(error);
        });
      }

      const getHistoricDiagnostics = async () => {
        await axios.get(`http://localhost/api/getHistoricDiagnostics`, {
          params: {
            user_id: authUser.id,
            ...lazyParams.value
          }, paramsSerializer: params => {
            return qs.stringify(params)
          }
        }).then((resp) => {
          const response = resp.data;
          if (response.metadata.code === 200) {
            historicDiagnostics.value = response.data;
            totalRecords.value = response.pagination.total;
          }
        }).catch((error) => {
          console.log(error);
        });
      }

      const onPage = (event) => {
        lazyParams.value.first = event.first;
        lazyParams.value.rows = event.rows;
        lazyParams.value.page = event.page +1;

        loadLazyData();
      };

      return {dt, loading, totalRecords, historicDiagnostics, lazyParams, onPage, confirmDiagnosis}
    }
  }
</script>

<style scoped>

</style>