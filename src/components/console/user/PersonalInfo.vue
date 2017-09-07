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
          <span>用户昵称</span>
          <input v-if="!isNameEdit" type="text" class="name disabled" v-model="usefulData.nikeName" disabled/>
          <input v-if="isNameEdit" type="text" class="name" v-model="usefulData.nikeName"/>
          <div v-if="!isNameEdit" class="edit-btn" @click="changeNameEdit">
            <i><img src="../../../assets/icon-edit.png"/></i><em>编辑</em>
          </div>
          <div v-if="isNameEdit" class="edit-btn" @click="nameEditSave">
            <i><img src="../../../assets/icon-save.png"/></i><em>保存</em>
          </div>
        </li>
        <li class="common email">
          <span>绑定邮箱</span><p>{{usefulData.xingEmail}}</p><div class="edit-btn" @click="usefulData.userPassword=true"><em>修改</em></div>
        </li>
        <li class="common tel">
          <span>绑定手机</span><p>{{usefulData.xingTel}}</p><div class="edit-btn" @click="usefulData.userPassword=true"><em>解绑</em></div>
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
      <!--修改邮箱弹窗 start-->
      <el-dialog v-if="!usefulData.userEmail" title="修改邮箱" :visible.sync="usefulData.userPassword" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="请输入密码" :label-width="usefulData.formLabelWidth">
            <el-input v-model="usefulData.password" placeholder="请输入账号密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.userPassword = false">取 消</el-button>
          <el-button type="primary" @click="editEmail">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-if="usefulData.userEmail" title="修改邮箱" :visible.sync="usefulData.userEmail" size="tiny" :before-close="handleClose">
        <el-form :model="usefulData">
          <el-form-item label="修改邮箱" :label-width="usefulData.formLabelWidth">
            <el-input type="email" v-model="usefulData.newEmail" placeholder="请输入新的邮箱地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.userEmail = false">取 消</el-button>
          <el-button type="primary" @click="usefulData.userEmail = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改邮箱弹窗 end-->
      <!--手机解绑弹窗 start-->
      <el-dialog v-if="!usefulData.userTel" title="手机解绑" :visible.sync="usefulData.userPassword" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="请输入密码" :label-width="usefulData.formLabelWidth">
            <el-input v-model="usefulData.password" placeholder="请输入账号密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.userPassword = false">取 消</el-button>
          <el-button type="primary" @click="editTel">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-if="usefulData.userTel" title="手机解绑" :visible.sync="usefulData.userTel" size="tiny" :before-close="handleClose">
        <!--这里需要处理一个逻辑，当点击确定解绑成功，当点击取消，就解绑不成功！！！-->
        <h4 class="success">验证成功!</h4>
        <p class="des">解除绑定后您将无法用当前绑定手机号继续登录股书平台并接收相关信息。<br/>是否确定要接除绑定？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.userTel = false">取 消</el-button>
          <el-button type="primary" @click="usefulData.userTel = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--手机解绑弹窗 end-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-personal-info',
  created() {
    // 邮箱@前均为*号
    const emailArray = this.usefulData.email.split('@');
    const editedEmai = emailArray.join('@');
    const len = emailArray[0].length;
    const x = '*';
    const xing = x.repeat(len);
    this.usefulData.xingEmail = editedEmai.replace(emailArray[0], xing);
    // 手机中间4位均为*号
    const tel = this.usefulData.tel;
    // console.log(tel);
    this.usefulData.xingTel = `${tel.substr(0, 3)}****${tel.substr(7)}`;
    // console.log(this.usefulData.xingTel);
  },
  data() {
    return {
      isNameEdit: false,
      oldName: '沙枫',
      usefulData: {
        userPassword: false, // 默认输入用户密码是不可见的
        userEmail: false, // 默认用户邮箱弹窗是不可见的
        userTel: false, // 默认进来用户手机号弹窗是不可见的
        password: '123', // 临时账号密码
        nikeName: '沙枫',
        newEmail: '', // 变更后的邮箱地址
        email: '675714031@qq.com', // 默认邮箱地址为空
        xingEmail: '', // 被截取后的邮箱地址
        tel: '15010841736', // 手机号
        xingTel: '', // 被截取后的手机号
        editStatus: false, // 默认输入框是不可编辑的
        changeNick: false, // 默认昵称是不可编辑的
        formLabelWidth: '90px',
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done();
      }).catch(() => {});
    },
    changeNameEdit() {
      this.isNameEdit = !this.isNameEdit;
      this.oldName = this.usefulData.nikeName;
    },
    nameEditSave() {
      this.isNameEdit = !this.isNameEdit;
      // 请求接口，如果成功的话，将nikeName值更新，要是失败的话，还是返回oldName;
    },
    // 编辑邮箱弹窗
    editEmail() {
      this.usefulData.userPassword = false;
      this.usefulData.userEmail = true; // 邮箱弹出
      // 这个地方需要做验证，当用户密码对上了，设置userPassword为true,这样切换弹窗里的内容
    },
    // 编辑手机解绑弹窗
    editTel() {
      this.usefulData.userPassword = false;
      this.usefulData.userTel = true; // 邮箱弹出
      // 这个地方需要做验证，当用户密码对上了，设置userPassword为true,这样切换弹窗里的内容
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
.infos ul li span, .infos ul li input , .infos ul li div, .infos ul li div em {
  line-height: 22px;
}
.infos ul li span, .infos ul li .name, .infos ul li .edit-btn {
  height: 22px;
  line-height: 22px;
  font-size: 14px;
}
.infos ul li span, .infos ul li .name {
  float: left;
  letter-spacing: 0.69px;
}
.infos ul li .name {
  padding: 0 5px;
 -webkit-box-sizing: border-box;
 -moz-box-sizing: border-box;
 box-sizing: border-box;
}
.infos ul li .name.disabled {
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
.el-input {
  width: auto !important;
}
.des{
  margin-bottom: 20px;
  line-height: 22px;
}
.success {
  color: #3184be;
  font-weight: 700;
  font-size: 16px;
}
</style>
