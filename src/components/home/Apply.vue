<template>
  <div class="apply">
    <div class="apply-inner">
      <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="apply-main">
          <el-input type="text" v-model="userName" placeholder="请输入您的名称"></el-input>
          <el-input type="text" v-model="companyName" placeholder="请输入公司名称"></el-input>
          <el-input type="email" v-model="email" placeholder="请输入邮箱地址"></el-input>
          <el-input type="tel" v-model="tel" placeholder="请输入手机号"></el-input>
          <el-textarea v-model="remarks" aria-placeholder="备注点什么？"></el-textarea>
          <a href="javascript:void(0)" class="apply-now">申请试用</a>
        </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
