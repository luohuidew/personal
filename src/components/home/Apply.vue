<template>
  <div class="apply">
    <div id="canvas-wrapper">
      <canvas id="demo-canvas"></canvas>
    </div>
    <div class="apply-inner">
      <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="apply-main">
          <el-input type="text" v-model.trim="userName" placeholder="请输入您的名称"></el-input>
          <el-input type="text" v-model.trim="companyName" placeholder="请输入公司名称"></el-input>
          <el-input type="email" v-model.trim="email" placeholder="请输入邮箱地址"></el-input>
          <el-input type="tel" v-model.number.trim="tel" placeholder="请输入手机号"></el-input>
          <el-input type="textarea" v-model.trim="remarks" :autosize="{ minRows: 1, maxRows: 4}" placeholder="备注点什么？" class="texarea"></el-input>
          <a href="javascript:void(0)" class="apply-now">申请试用</a>
        </div>
    </div>
  </div>
</template>

<script>
import canvasbg from '../../lib/canvasbg';
export default {
  name: 'apply',
  data() {
    return {
      userName: '', // 名称
      companyName: '', // 公司名称
      email: '', // 邮箱地址
      tel: '', // 电话号码
      remarks: '', // 备注
    };
  },
  mounted() {
    this.canvas();
  },
  methods: {
    canvas() {
      canvasbg.init({
        Loc: {
          x: window.innerWidth / 2,
          y: window.innerHeight / 3.3,
        },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.texarea.el-textarea .el-textarea__inner{
  border: none;
}
</style>
