<template>
  <div class="invitation">
    <div class="top"><img src="../../assets/login-logo.png"/></div>
    <div class="contain">
      <div class="main-con">
        <p>XXXXXX公司 正在邀请您启用</p>
        <p class="fontColor">CapTable - XXXXXXXXXX期权管理系统</p>
        <div class="noneBlock"></div>
        <span>如果您还没有股书账号，请注册新的账号接受邀请</span>
        <span>您也可以用已有的账号接受邀请</span>
        <div class="noneBlock"></div>
        <div class="btnDiv">
          <router-link class="return btn" :to="{ path: '/invitation_register' }">注册新账号并接受邀请</router-link>
          <router-link class="return btn1" :to="{ path: '/login' }">登录已有账号接受邀请</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvitationIndex',
  data() {
    return {
      companyName: undefined,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.top{
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dce2ee;
  padding: 0 20px;
}
.top img{
  margin-top: 10px;
}
.contain{
  margin: 20px auto;
  background: #fff;
  box-shadow: 0px 4px 3px -5px #333;
  border-radius: 3px;
}
.main-con{
  width: 80%;
  margin: auto;
  padding: 100px 40px;
}
p{
  color: #555;
  font-size: 24px;
  text-align: center;
}
.fontColor{
  color: #546AAC;
}
.noneBlock{
  height: 80px;
}
span{
  display: block;
  color: #9b9b9b;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
}
.btn, .btn1{
  display: inline-block;
  padding: 0 20px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #546AAC;
}
.btn{
  color: #ffffff;
  background: #546AAC;
  margin-right: 80px;
}
.btn:hover{
  color: #546AAC;
  background: #fff;
}
.btn1{
  color: #546AAC;
}
.btn1:hover{
  color: #ffffff;
  background: #546AAC;
}
.btnDiv{
  text-align: center;
}
</style>
