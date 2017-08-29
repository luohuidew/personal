<template>
  <div class="eq-index">
    <br>
    <br>
    <br>
    <br>
    我是控制台内容部分。。。我是控制台内容部分。。。

    <div @click="jump" style="border: 1px solid red;width: 100px;">点我跳到企业端</div>
    <br>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'eq-index',
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
