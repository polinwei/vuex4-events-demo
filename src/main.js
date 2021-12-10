import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cron from 'vue3-crontable'

createApp(App)
  .use(store)
  .use(router)
  .use(cron)
  .mount('#app')
