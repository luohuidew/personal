// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import Index from './Index.vue';
import router from './router';

import './style/reset.css';
import './style/console-common.css';
import './theme/index.css';

Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  template: '<Index/>',
  components: { Index },
});
