<template>
  <div class="user-personal-info">
    <div class="edit-img">
      <img src="../../../assets/edit-img.png"/>
      <span>编辑头像</span>
    </div>
    <div class="infos">
      <h2>基础信息</h2>
      <ul class="line1">
        <li class="nikeName" :v-model="usefulData">
          <span>用户昵称</span><input :disabled="true" class="name" v-model="usefulData.nikeName"/><div class="edit-btn" @click="usefulData.changeNick = true"><i><img src="../../../assets/icon-edit.png"/></i><em>编辑</em></div>
        </li>
        <li class="common email">
          <span>绑定邮箱</span><p>*****@shihuilaw.com</p><div class="edit-btn"><em>修改</em></div>
        </li>
        <li class="common tel">
          <span>绑定手机</span><p>186****4563</p><div class="edit-btn"><em>解绑</em></div>
        </li>
      </ul>
      <h2>安全设置</h2>
      <ul class="line2">
        <li class="common autonym">
          <span>实名认证</span><p>未认证</p><div class="edit-btn"><em>实名认证</em></div>
        </li>
        <li class="common sign">
          <span>签名管理</span><p><img src="../../../assets/sign-img.png"/></p><div class="edit-btn"><em>设置</em></div>
        </li>
        <li class="common account">
          <span>账号安全</span><div class="edit-btn"><em>修改密码</em></div>
        </li>
      </ul>
      <div class="attention">
        <i>*</i><p>接受期权授予协议，必须要完成实名认证才能顺利签字。</br>实名认证审核时间约为1个工作日 ，请您合理安排认证时间，避免耽误签字。</p>
      </div>
      <el-dialog title="修改昵称" :visible.sync="usefulData.changeNick" size="tiny" :before-close="handleClose">
      <el-form :model="usefulData">
        <el-form-item label="昵称" :label-width="usefulData.formLabelWidth">
          <el-input v-model="usefulData.nickName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeNick = false">取 消</el-button>
        <el-button type="primary" @click="changeNick = false">确 定</el-button>
      </span>
    </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-personal-info',
  data() {
    return {
      usefulData: {
        nikeName: '沙枫',
        editStatus: false, // 默认输入框是不可编辑的
        changeNick: false, // 默认昵称是不可编辑的
        formLabelWidth: '120px',
      },
    };
  },
  methods: {
    toggle() {
      this.usefulData.edtiStatus = !this.usefulData.edtiStatus;
      console.log(this.usefulData.edtiStatus);
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done();
      }).catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
}
.user-personal-info {
  padding: 70px 4.2% 130px;
  background: #fff;
  overflow: hidden;
}
.edit-img, .infos {
  float: left;
}
.edit-img {
  width: 7.58%;
  margin-right: 6.5%;
  text-align: center;
  cursor: default;
}
.edit-img img {
  width: 100%;
  height: auto;
  margin-bottom: 6px;
}
.edit-img img, .edit-img span{
  display: block;
}
.edit-img span {
  color: #546AAC;
  letter-spacing: 0.69px;
  line-height: 22px;
}
.infos {
  width: 40%;
}
.infos h2 {
  margin-bottom: 22px;
  font-size: 16px;
  color: #666666;
  letter-spacing: 1px;
  line-height: 24px;
}
.infos ul {
  border-bottom: 1px solid #EBEBEB;
}
.infos ul li{
  margin-bottom: 26px;
  line-height: 22px;
  overflow: hidden;
}
.infos ul li span, .infos ul li .name, .infos ul li .edit-btn {
  line-height: 22px;
  font-size: 14px;
}
.infos ul li span, .infos ul li .name {
  float: left;
  letter-spacing: 0.69px;
}
.name {
  border: 0 none;
}
.infos ul li span {
  margin-right: 6%;
  color: #999;
}
.infos ul li .name, .infos ul li p {
  display: inline-block;
  width: 60%;
  color: #666;
}
.infos ul li .edit-btn {
  float: right;
  min-width: 55px;
}
.infos ul li em {
  color: #546AAC;
  letter-spacing: 1px;
  font-style: normal;
}
.infos ul li .edit-btn em, .infos ul li .edit-btn i {
  float: left;
  cursor: default;
}
.infos ul li .edit-btn i{
  position: relative;
  top: 1px;
  width: 12px;
  height: 12px;
  margin-right: 18%;
}
.infos ul li .edit-btn i img{
  width: 100%;
  height: 100%;
}
.infos ul li.common .edit-btn em {
  float: right;
}
.line1 {
  margin-bottom: 30px;
}
.line2 {
  margin-bottom: 18px;
}
.attention {
  overflow: hidden;
  line-height: 22px;
}
.attention i{
  float: left;
  display: block;
  width: 3%;
  height: 66px;
  color: #C73131;
}
.attention p {
  float: left;
  display: block;
  width: 97%;
  color: #3F3F3F;
  letter-spacing: 0.69px;
}
</style>
