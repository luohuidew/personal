<template>
  <div id="home">
    我是企业展示端
    <hm-header></hm-header>
    <router-view></router-view>
    <hm-footer></hm-footer>
  </div>
</template>

<script>
import HmHeader from './components/home/HmHeader';
import HmFooter from './components/home/HmFooter';

export default {
  name: 'home',
  components: {
    HmHeader, HmFooter,
  },
};
</script>
