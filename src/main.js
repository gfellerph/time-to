import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {store} from './store'
import mitt from 'mitt'

const app = createApp(App)
app.use(store)
app.config.globalProperties.mitt = mitt()
app.mount('#app')
