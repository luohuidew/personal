// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import './theme/index.css';
import Index from './Index.vue';
import router from './router';


Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<Index/>',
  components: { Index },
});
