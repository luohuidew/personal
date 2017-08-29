<template>
  <div class="hm-home">
    <br>
    <br>
    <br>
    我是首页内容部分。。。我是首页内容部分。。。
    <div @click="jump" style="border: 1px solid red;width: 100px;">点我跳到控制台</div>
    <br>
    <br> <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'hm-home',
  data() {
    return {
    };
  },
  methods: {
    jump() {
//      this.$router.push({ name: 'ForgetPassword' });
      window.location.href = `http://${window.location.host}/console`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
