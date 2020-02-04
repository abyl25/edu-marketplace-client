import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { AUTH_LOGOUT } from "@/store/actions";
import axios from 'axios';
import Paginate from 'vuejs-paginate';
import vSelectMenu from 'v-selectmenu';
import vClickOutside from 'v-click-outside';
import VuePlyr from 'vue-plyr';
import uploader from 'vue-simple-uploader';
import Multiselect from 'vue-multiselect';

// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
// import "vue-navigation-bar/dist/vue-navigation-bar.css";
// import VueNavigationBar from "vue-navigation-bar";

// Vue.component("vue-navigation-bar", VueNavigationBar);
// Vue.use(Antd);

//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import VueFroala from 'vue-froala-wysiwyg';

Vue.use(VueFroala);
Vue.use(vClickOutside);
Vue.use(vSelectMenu, { global });
Vue.component('multiselect', Multiselect);
Vue.component('paginate', Paginate);
Vue.use(uploader);
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: true }
  },
  emit: ['ended']
});


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
