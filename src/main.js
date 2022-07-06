//vue and core packages imports
import App from './App.vue'
import {createApp, markRaw} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//primevue component imports
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import InlineMessage from 'primevue/inlinemessage';
import Message from 'primevue/message';
import Card from 'primevue/card';
import MultiSelect from 'primevue/multiselect';
import Chart from 'primevue/chart';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

//base css for layout and component library
import './index.css'
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
//import '/node_modules/primeflex/primeflex.css'

//create pinia store
const pinia = createPinia()
//inject persistedstate, router, axios and toast instances to pinia stores
pinia.use(({store}) => {
    store.$router = markRaw(router)
    store.$axios = markRaw(axios)
})
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Chart', Chart);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InlineMessage', InlineMessage);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('Card', Card);
app.component('MultiSelect', MultiSelect);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Tag', Tag);

app.use(PrimeVue);
app.use(ToastService);
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.mount('#app')