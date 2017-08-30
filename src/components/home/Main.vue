<template>
  <div class="main">
    <br>
    <br>
    <br>
    <section class="part2">
      <h3 class="small-head"><i>.</i><span>产品功能</span><i>.</i></h3>
      <h2 class="mid-head">一站式股权管理</h2>
      <el-row :gutter="20" class="part2-main">
        <el-col :span="6">
          <div class=""></div>
        </el-col>
        <el-col :span="6">
          <div class=""></div>
        </el-col>
        <el-col :span="6">
          <div class=""></div>
        </el-col>
        <el-col :span="6">
          <div class=""></div>
        </el-col>
      </el-row>
    </section>
    <div @click="jump" style="border: 1px solid red;width: 100px;">点我跳到控制台</div>
    <br>
    <br> <br>
    <br>
  </div>
</template>

<script>
export default {
  name: 'main',
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
.part2{
  height: 720px;
  padding: 56px 15.6% 98px;
  background: #F4F5F7;
}
.small-head span{
  margin: 0 10px;
  color: #3B3D40;
  font-weight: normal;
  font-size: 16px;
}
.small-head i{
  width:3px;
  height:3px;
  color: #616366;
}
.small-head span,.small-head i{
  position: relative;
  top: -4px;
  display: inline-block;
  line-height: 24px;
}
.mid-head{
  margin: 26px 0 47px;
  font-size: 26px;
  line-height: 55px;
  color: #3B3D40;
  font-weight: normal;
}
.part2-main .el-col{
  height: 400px;
  background: #fff;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
}
.part2-main:first-child {
  box-shadow: 0 5px 20px 0 rgba(185,185,185,0.52);
}
</style>
