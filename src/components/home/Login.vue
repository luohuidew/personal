<template>
  <div class="login">
      <section class="login-inner">
        <a href="javascript:void(0)" class="logo"><img src="../../assets/login-logo.png"/></a>
        <div class="login-main">
          <el-input type="text" v-model.trim="userName" placeholder="请输入邮箱／手机号"></el-input>
          <el-input type="password" v-model.trim="password" placeholder="请输入密码"></el-input>
          <el-row type="flex" justify="end">
            <el-col :span="12" class="forget-pass"><a href="#/forget_password">忘记密码？</a></el-col>
          </el-row>
          <a href="javascript:void(0)" class="login-now">立即登录</a>
          <div class="trial">
            <a href="#/apply">申请试用<i></i></a>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      userName: '', // 用户名
      password: '', // 密码
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forget-pass {
    text-align: right;
}
.forget-pass a {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(200,200,200,0.70);
  letter-spacing: 6px;
  line-height: 20px;
}
.trial {
  text-align: center;
}
.trial a {
  display: inline-block;
  font-family: NotoSansHans-Regular;
  font-size: 16px;
  color: #546AAC;
  letter-spacing: 7px;
  text-align: center;
  line-height: 24px;
}
.trial a:hover {
  -webkit-opacity: 0.8; 
  -moz-opacity: 0.8;
  -khtml-opacity: 0.8;
  opacity: .8;
  filter:alpha(opacity=80);
  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=80);
}
.trial i{
  position: relative;
  top: 7px;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-left: 3px;
  background: url('../../assets/icon-trial.png') no-repeat center center/24px 24px;
}
</style>
