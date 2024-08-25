import './assets/main.css'
import '/node_modules/primeflex/primeflex.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/data.js'

const app = createApp(App)

app.use(router)
app.use(store);

app.mount('#app')
