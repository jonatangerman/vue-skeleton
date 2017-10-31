import Vue from 'vue';
import App from './src/App'
import Router from 'vue-router'

import Axios from './config/axios';
import router from './config/router';

// Bind Modules to Vue
Vue.prototype.$axios = Axios;
Vue.use(Router);


// Initialize vue
new Vue({
    el: '#app',
    router,
    render: createElement => createElement(App),
});
