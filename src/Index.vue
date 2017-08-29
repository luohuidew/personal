<template>
  <div id="index">
    我是企业控制台
    <con-header></con-header>
    <router-view></router-view>
    <con-sidebar></con-sidebar>
  </div>
</template>

<script>
import ConHeader from './components/console/ConHeader';
import ConSidebar from './components/console/ConSidebar';

export default {
  name: 'index',
  components: {
    ConHeader, ConSidebar,
  },
};
</script>

<style>
#index {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
