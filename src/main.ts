// eslint-disable-next-line import/no-unresolved
import 'uno.css'
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
