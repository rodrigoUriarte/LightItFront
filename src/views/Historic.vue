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
            //this.$toast.add({severity: 'error', summary: 'Register status', detail: error.response.data.message, life: 3000});
          });
        }, Math.random() * 1000 + 250);
      };

      const onPage = (event) => {
        lazyParams.value.first = event.first;
        lazyParams.value.rows = event.rows;
        lazyParams.value.page = event.page +1;

        loadLazyData();
      };


      return {dt, loading, totalRecords, historicDiagnostics, lazyParams, loadLazyData, onPage}
    }
  }
</script>

<style scoped>

</style>