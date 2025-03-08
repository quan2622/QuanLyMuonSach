import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import "./assets/normalize.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.js";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import './assets/admin-style.css'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
