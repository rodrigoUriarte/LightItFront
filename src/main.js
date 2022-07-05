//vue and core packages imports
import App from './App.vue'
import {createApp, markRaw} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

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

import Tooltip from 'primevue/tooltip';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import {useToast} from "primevue/usetoast";

//base css for layout and component library
import './index.css'
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
//import '/node_modules/primeflex/primeflex.css'

//create pinia store
const pinia = createPinia()

//inject router, axios and toast instances to pinia stores
pinia.use(({store}) => {
    store.$router = markRaw(router)
    store.$axios = markRaw(axios)
    store.$toast = markRaw(useToast())
})

const app = createApp(App)

app.component('Avatar', Avatar);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('InputText', InputText);
app.component('InlineMessage', InlineMessage);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('Card', Card);
app.component('MultiSelect', MultiSelect);
app.directive('tooltip', Tooltip);
app.use(ToastService);
app.use(PrimeVue);
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'
app.mount('#app')
