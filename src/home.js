// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import router from '@/router/home';
import Home from '@/home.vue';


import '@/style/reset.css';
import '@/style/home-common.css';
import '@/theme/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#home',
  router,
  template: '<Home/>',
  components: { Home },
});
