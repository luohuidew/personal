<template>
  <div class="user-enterprise-list">
    <br>
    <br>
    <br>
    <br>
    我是控制台内容部分。。。我是控制台内容部分。。。

    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'user-enterprise-list',
  data() {
    return {
    };
  },
  methods: {
    jump() {
      //      this.$router.push({ name: 'ForgetPassword' });
      window.location.href = `http://${window.location.host}/home.html`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
