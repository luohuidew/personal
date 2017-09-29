<template>
  <div class="invitation">
    <div class="top"><img src="../../assets/login-logo.png"/></div>
    <div class="contain">
      <div class="main-con">
        <div class="inputDiv"><input class="f-control" v-model="companyName">正在邀请您启用</div>
        <p class="fontColor">CapTable - 精益股权期权管理系统</p>
        <div class="noneBlock"></div>
        <span>如果您还没有股书账号，请注册新的账号接受邀请</span>
        <span>您也可以用已有的账号接受邀请</span>
        <div class="noneBlock"></div>
        <div class="btnDiv">
          <el-button class="return btn" @click="registerLink">注册新账号并接受邀请</el-button>
          <el-button class="return btn1" @click="loginLink">登录已有账号接受邀请</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pService from '@/service/participator';

export default {
  name: 'InvitationIndex',
  data() {
    return {
      companyName: undefined, // 公司名
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // TODO：通过code获取公司名称
      this.companyCode = location.hash.split('/').pop();
      pService.getCompanyInfoByCode(this.companyCode).then((resp) => {
        if (resp.code.code === 200) {
          this.companyName = resp.data.companyName;
        }
      }, (resp) => {
        this.$message.error(resp.code.msg);
      });
    },
    registerLink() {
      this.$router.push({
        name: 'InvitationRegister',
        params: { code: this.companyCode },
      });
    },
    loginLink() {
      this.$router.push({
        name: 'InvitationLogin',
        params: { code: this.companyCode },
      });
    },
  },
};
</script>

<style scoped>
.inputDiv{
  color:#555;
  font-size: 24px;
  text-align: center;
  padding-bottom: 15px;
}
.f-control{
  border: none;
  font-size: 24px;
  text-align: right;
  padding-right: 10px;
  font-family: 'HanHei SC', 'PingFang SC', '\5FAE\8F6F\96C5\9ED1', sans-serif;
  color: #555;
}
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
