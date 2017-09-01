<template>
  <div id="index">
    <con-header></con-header>
    <router-view id="router-page" class="router-page"></router-view>
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
  #router-page{
    overflow: hidden;
    min-height: 550px;
    padding: 80px 20px 20px 230px;
  }
  .router-page {
    background: #eee;
  }
</style>
