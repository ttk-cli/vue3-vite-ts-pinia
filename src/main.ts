import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import './styles/index.scss'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
