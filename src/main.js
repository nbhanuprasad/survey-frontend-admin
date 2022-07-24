import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router';
import VueCollapsiblePanel from '@dafcoe/vue-collapsible-panel';
import '@dafcoe/vue-collapsible-panel/dist/vue-collapsible-panel.css';

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueCollapsiblePanel)
  .mount('#app')
