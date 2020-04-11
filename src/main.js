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
import Vuelidate from 'vuelidate';
import Transitions from 'vue2-transitions';
import ScrollAnimation from './directives/scrollAnimation';

//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/third_party/embedly.min';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import VueFroala from 'vue-froala-wysiwyg';

Vue.use(Transitions);
Vue.directive('scrollanimation', ScrollAnimation);
Vue.use(Vuelidate);
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

// toast
import VueNotifications from 'vue-notifications';
import toastr from 'toastr';    // https://github.com/CodeSeven/toastr
import 'jquery';
import 'toastr/build/toastr.min.css';

function toast ({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return toastr[type](message, title, {timeOut: timeout})
}
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast
};
Vue.use(VueNotifications, options);

// i18n
import VueI18n from 'vue-i18n';
import messages from "@/data/messages";
import scrollAnimation from "@/directives/scrollAnimation";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localStorage.getItem('locale') || 'en',
  fallbackLocale: 'en',
  messages,
});

Vue.config.productionTip = false;

// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_API);

// set axios auth token header
(function() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
})();

// 401 response interceptor
axios.interceptors.response.use(resp => resp, err => {
  if (err.response.status === 401) {
    // console.log('path: ' + this.$route.path);
    // console.log('courseId: ' + this.$route.params.id);
    store.dispatch(AUTH_LOGOUT).then(() => router.push({ path: '/auth', query: {logout: '1'}}));
  }
  return Promise.reject(err);
});

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
