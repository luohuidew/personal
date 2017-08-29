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

<style>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
