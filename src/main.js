import {createApp, markRaw} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './index.css'

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
    store.$router = markRaw(router)
    store.$axios = markRaw(axios)
})

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)  // provide 'axios'

app.mount('#app')
