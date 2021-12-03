import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ArgonDashboard from './plugins/argon-dashboard';
import 'element-plus/lib/theme-chalk/index.css';
import store from './store/store'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Notifications from '@kyvg/vue3-notification';


// axios
import axios from './axios/axios';

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(store);
appInstance.use(Notifications);
appInstance.use(VueLoading, {
  color: '#5e72e4',
});

appInstance.config.globalProperties.$http = axios;

appInstance.mount('#app');
