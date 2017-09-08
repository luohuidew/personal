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
          <input v-if="!isNameEdit" type="text" class="name disabled" v-model.trim="usefulData.nikeName" disabled/>
          <input v-if="isNameEdit" type="text" class="name" v-model.trim="usefulData.nikeName"/>
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
          <span>绑定手机</span>
          <p v-if="!usefulData.unlinkTel">{{usefulData.xingTel}}</p>
          <div v-if="!usefulData.unlinkTel" class="edit-btn" @click="usefulData.userPassword=true">
            <em>解绑</em>
          </div>
          <p v-if="usefulData.unlinkTel">未绑定</p>
          <div v-if="usefulData.unlinkTel" class="edit-btn" @click="usefulData.linkTel=true">
            <em>手机绑定</em>
          </div>
        </li>
      </ul>
      <h2>安全设置</h2>
      <ul class="line2">
        <li class="common autonym">
          <span>实名认证</span><p>未认证</p><div class="edit-btn" @click="usefulData.realNameStatus=true"><em>实名认证</em></div>
        </li>
        <li class="common sign">
          <span>签名管理</span><p><img src="../../../assets/sign-img.png"/></p><div class="edit-btn"><em>设置</em></div>
        </li>
        <li class="common account">
          <span>账号安全</span><div class="edit-btn" @click="usefulData.passwordStatus=true"><em>修改密码</em></div>
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
            <el-input v-model.trim="usefulData.password" placeholder="请输入账号密码"></el-input>
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
            <el-input type="email" v-model.trim="usefulData.newEmail" placeholder="请输入新的邮箱地址"></el-input>
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
            <el-input v-model.trim="usefulData.password" placeholder="请输入账号密码"></el-input>
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
          <el-button type="primary" @click="editUnlinkTel">确 定</el-button>
        </span>
      </el-dialog>
      <!--手机解绑弹窗 end-->
      <!--手机绑定弹窗 start-->
      <el-dialog v-if="usefulData.linkTel" title="手机绑定" :visible.sync="usefulData.linkTel" size="tiny" :before-close="handleClose">
        <el-form :model="usefulData" :rules="rules">
          <el-form-item prop="newTel" label="手机号" :label-width="usefulData.formLabelWidth" required="">
            <el-input type="tel" v-model.number.trim="usefulData.newTel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item required prop="telCode" label="手机验证码" :label-width="usefulData.formLabelWidth" class="tel-code">
            <!--这里需要做一个处理，掉接口判断手机验证码正确与否-->
            <el-input v-model.trim="usefulData.telCode" placeholder="请输入手机验证码" class="tel-code"></el-input><el-button>发送验证码</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.linkTel = false">取 消</el-button>
          <el-button type="primary" @click="usefulData.linkTel = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--手机绑定弹窗 end-->
      <!--实名认证弹窗 start-->
      <el-dialog v-if="usefulData.realNameStatus" title="实名认证" :visible.sync="usefulData.realNameStatus" size="small" :before-close="handleClose">
        <el-form :model="usefulData" :rules="rules">
          <el-form-item label="真实姓名" :label-width="usefulData.formLabelWidth">
            <el-input v-model.trim="usefulData.confirmRealName" placeholder="请输入您的真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="证件号" :label-width="usefulData.formLabelWidth" class="ids">
            <el-row :gutter="10" class="ids-row">
              <el-col :span="7">
                <el-select v-model="idValue" clearable placeholder="请选择" @change="changeItem">
                  <el-option
                    v-for="item in certificateLists"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="17">
                <el-input v-if="usefulData.passportStatus" v-model.trim="usefulData.passportNo" placeholder="请输入您的证件号"></el-input>
                <el-input v-if="usefulData.idStatus" v-model.trim="usefulData.idNo" placeholder="请输入您的证件号"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="手持证件照" :label-width="usefulData.formLabelWidth" class="hand-photo">
            <el-row :gutter="15">
              <el-col :span="10">
                <img v-if="imageUrl" :src="imageUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/hand-idphoto.png"/>
                </i>
                <el-upload
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
              <el-col :span="14">
                <p>注意：<br/>选取纯色干净背景拍摄<br/>手臂和脸部完全露出无遮挡<br/>证件全部信息清晰无遮挡</p>
                <!-- <div>或
                  <el-tooltip placement="top">
                    <div slot="content"></div>
                    <el-button>扫描二维码拍照上传</el-button>
                  </el-tooltip>
                </div> -->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="证件正反面" :label-width="usefulData.formLabelWidth">
            <el-row :gutter="30" class="two-upload">
              <el-col :span="12">
                <img v-if="frontUrl" :src="frontUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/id-img.png"/>
                </i>
                <el-upload
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
              <el-col :span="12">
                <img v-if="backUrl" :src="backUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/id-img.png"/>
                </i>
                <el-upload
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.userPassword = false">取 消</el-button>
          <el-button type="primary" @click="editTel">确 定</el-button>
        </span>
      </el-dialog>
      <!--实名认证弹窗 end-->
      <!--修改密码弹窗 start-->
      <el-dialog v-if="usefulData.passwordStatus" title="修改密码" :visible.sync="usefulData.passwordStatus" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="旧密码" :label-width="usefulData.formLabelWidth">
            <el-input v-model.trim="usefulData.password" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="usefulData.formLabelWidth">
            <el-input v-model.trim="usefulData.newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="usefulData.formLabelWidth">
            <el-input v-model.trim="usefulData.confirmPassword" placeholder="请再次输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="密码安全性" :label-width="usefulData.formLabelWidth">
            <el-row :gutter="10" class="safety">
              <el-col :span="8" class="active"><span></span></el-col>
              <el-col :span="8" class="active"><span></span></el-col>
              <el-col :span="8"><span></span></el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="usefulData.passwordStatus = false">取 消</el-button>
          <el-button type="primary" @click="usefulData.passwordStatus = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改密码弹窗 end-->
    </div>
  </div>
</template>

<script>
import validate from '../../../utils/validation';

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
    this.usefulData.xingTel = `${tel.substr(0, 3)}****${tel.substr(7)}`;
  },
  data() {
    return {
      frontUrl: '', // 正面证件照
      backUrl: '', // 背面证件照
      imageUrl: '', // 手持证件照
      isNameEdit: false,
      oldName: '沙枫',
      idValue: '', // 证件类型
      certificateLists: [
        {
          value: '0',
          label: '身份证',
        }, {
          value: '1',
          label: '护照',
        },
      ],
      usefulData: {
        userPassword: false, // 默认输入用户密码弹窗是不可见的
        userEmail: false, // 默认用户邮箱弹窗是不可见的
        userTel: false, // 默认进来用户手机号弹窗是不可见的
        password: '123', // 临时账号密码
        newPassword: '', // 修改后的密码
        confirmPassword: '', // 确认的新密码
        passwordStatus: false, // 默认修改密码不可见
        nikeName: '沙枫',
        newEmail: '', // 变更后的邮箱地址
        email: '675714031@qq.com', // 默认邮箱地址为空
        xingEmail: '', // 被截取后的邮箱地址
        tel: '15010841736', // 手机号
        newTel: '', // 验证码手机号新的手机号
        xingTel: '', // 被截取后的手机号
        unlinkTel: false, // 默认进来手机解绑为false
        linkTel: false, // 默认进来手机号未绑定
        editStatus: false, // 默认输入框是不可编辑的
        changeNick: false, // 默认昵称是不可编辑的
        formLabelWidth: '95px',
        telCode: '', // 默认手机验证码
        telCodeStatus: false, // 手机验证码状态
        confirmRealName: '', // 输入的实名
        realName: '', // 实名认证的实名
        realNameStatus: false, // 默认进来实名认证弹窗是不可见状态
        idNo: '', // 身份证号
        idStatus: true, // 身份证被选中
        passportNo: '', // 护照号码
        passportStatus: false, // 默认护照没有被选中
      },
      rules: {
        newTel: [
          { validator: this.checkTel, trigger: 'blur' },
        ],
        telCode: [
          { validator: this.checkTelCode, trigger: 'blur' },
        ],
        idNo: [
          { validator: this.checkIdNo, trigger: 'blur' },
        ],
        passportNo: [
          { validator: this.checkPassportNo, trigger: 'blur' },
        ],
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
    // 手机解绑确认
    editUnlinkTel() {
      this.usefulData.userTel = false;
      this.usefulData.unlinkTel = true; // 手机解绑成功
      // this.usefulData.linkTel = true; // 手机号未被绑定为true
    },
    // 验证手机号
    checkTel(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('手机号不能为空！'));
      } else if (value && !validate.isPhoneAvailable(value)) {
        // 如果不符合电话号码的情况下
        result = callback(new Error('请输入正确的手机号！'));
      }
      return result;
    },
    // 手机验证码
    checkTelCode(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('验证码不能为空！'));
      } else if (value && false) {
        // 这里需要调用手机验证码接口来做判断
        result = callback(new Error('请输入正确的验证码！'));
      }
      return result;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 验证身份证号
    checkIdNo(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('身份证号不能为空！'));
      } else if (value && !validate.isIDNO(value)) {
        // 如果不符合身份证号码的情况下
        result = callback(new Error('请输入正确的身份证号！'));
      }
      return result;
    },
    // 验证护照号
    checkPassportNo(rule, value, callback) {
      let result = '';
      if (!value) {
        result = callback(new Error('护照号不能为空！'));
      } else if (value && !validate.isPassport(value)) {
        // 如果不符合护照号码的情况下
        result = callback(new Error('请输入正确的护照号！'));
      }
      return result;
    },
    changeItem(item) { // 当发生选中的时候出发的
      if (item === 0) { // 如果是身份证
        this.usefulData.passportStatus = false;
        this.usefulData.idStatus = true;
      }
      if (item === 1) { // 护照
        this.usefulData.passportStatus = true;
        this.usefulData.idStatus = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  -webkit-user-select :none;
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
.tel-code .el-input{
  width: 90px !important;
  margin-right: 10px;
}
.tel-code .el-button {
  padding:10px 5px!important;
}
.safety.el-row span {
  display: block;
  width: 100%;
  margin-top: 16px;
  border-bottom: 3px solid #ccc;
}
.safety.el-row .el-col.active span{
  border-bottom: 3px solid #f3b043;
}
.ids .el-select {
  width: 100%;
}
.el-dialog--small .el-input {
  width:  100% !important;
}
.ids .el-col-17 .el-input {
  width: 100% !important;
}
/* .ids-row .el-col {
  padding: 0 !important;
} */
.ids-row .el-col.el-col-7 {
  padding-left: 0 !important;
}
.ids-row .el-col.el-col-17 {
  padding-right: 0 !important;
}
.hand-photo .el-row, .el-row.two-upload, .ids-row, .safety.el-row {
  margin: 0 !important;
}
.hand-photo .el-row .el-col-10 .avatar-uploader, .el-row.two-upload .avatar-uploader {
  margin-bottom: 10px;
  line-height: 100% !important;
}
.hand-photo .el-row .el-col-10 .avatar-uploader img, .el-row.two-upload .avatar-uploader img {
  width: 100%;
  height: auto;
}
.avatar-uploader-icon.upload {
  width: 100%;
  height: 40px;
  background: #F4F4F4;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  border: 0 none;
  color: #999;
  text-align: center;
}
.avatar-uploader-icon.upload .el-upload {
  letter-spacing: 1.14px;
  line-height: 21px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader {
  display: block;
  width: 100%;
}
.avatar-uploader img {
  width: 100%;
  height: auto;
}
.el-form-item__content {
  line-height: 32px !important;
}
</style>
