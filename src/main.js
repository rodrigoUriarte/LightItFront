//vue and core packages imports
import {createApp, markRaw} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

//primevue component imports
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import {useToast} from "primevue/usetoast";

//base css for layout and component library
import './index.css'
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

//create pinia store
const pinia = createPinia()

//inject router, axios and toast instances to pinia stores
pinia.use(({store}) => {
    store.$router = markRaw(router)
    store.$axios = markRaw(axios)
    store.$toast = markRaw(useToast())
})

const app = createApp(App)

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Toast', Toast);
app.use(ToastService);
app.use(PrimeVue);
app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')
