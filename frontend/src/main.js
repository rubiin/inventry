import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ArgonDashboard from './plugins/argon-dashboard';
import 'element-plus/lib/theme-chalk/index.css';
import store from './store/store'

// axios
import axios from './axios/axios';

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use(ArgonDashboard);
appInstance.use(store);

appInstance.config.globalProperties.$http = axios;

appInstance.mount('#app');
