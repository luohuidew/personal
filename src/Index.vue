<template>
  <div id="index">
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

</style>
