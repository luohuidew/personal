<template>
  <div id="index">
    <con-header></con-header>
    <div class="router-wrap">
      <router-view></router-view>
    </div>
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
    min-height: 100%;
    background: #eee;
  }
  .router-wrap {
    padding: 80px 20px 20px 230px;
  }

</style>
