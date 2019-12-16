import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CKEditor from '@ckeditor/ckeditor5-vue'
import axios from 'axios';
import { AUTH_LOGOUT } from "@/store/actions";

Vue.component('paginate', VuejsPaginate);
Vue.use(CKEditor);
Vue.config.productionTip = false;

// 401 response interceptor
axios.interceptors.response.use(resp => resp, err => {
  if (err.response.status === 401) {
    store.dispatch(AUTH_LOGOUT).then(() => router.push({ path: '/login', query: {logout: '1'}}));
  }
  return Promise.reject(err);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
