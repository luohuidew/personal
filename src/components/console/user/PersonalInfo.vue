<template>
  <div class="user-personal-info">
    <div class="edit-img">
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="usefulData.portrait" :src="usefulData.portrait" class="avatar">
        <i v-else class="avatar-uploader-icon"><img src="../../../assets/edit-img.png"/></i>
        <span>编辑头像</span>
      </el-upload>
    </div>
    <div class="infos" :v-model="usefulData">
      <h2>基础信息</h2>
      <ul class="line1">
        <li class="username">
          <span>用户昵称</span>
          <input v-if="!isNameEdit" type="text" class="name disabled" v-model.trim="usefulData.username" disabled/>
          <input v-if="isNameEdit" type="text" class="name" v-model.trim="usefulData.username"/>
          <div v-if="!isNameEdit" class="edit-btn" @click="changeNameEdit">
            <i><img src="../../../assets/icon-edit.png"/></i><em>编辑</em>
          </div>
          <div v-if="isNameEdit" class="edit-btn" @click="nameEditSave">
            <i><img src="../../../assets/icon-save.png"/></i><em>保存</em>
          </div>
        </li>
        <li class="common email">
          <span>绑定邮箱</span><p>{{usefulData.xingEmail}}</p><div class="edit-btn" @click="userPassword=true"><em>修改</em></div>
        </li>
        <li class="common phone">
          <span>绑定手机</span>
          <p v-if="!unlinkTel">{{usefulData.xingTel}}</p>
          <div v-if="!unlinkTel" class="edit-btn" @click="userPassword=true">
            <em>解绑</em>
          </div>
          <p v-if="unlinkTel">未绑定</p>
          <div v-if="unlinkTel" class="edit-btn" @click="linkTel=true">
            <em>手机绑定</em>
          </div>
        </li>
      </ul>
      <h2>安全设置</h2>
      <ul class="line2">
        <li class="common autonym">
          <span>实名认证</span><p v-if="firstCertificateStatus || certificateFailStatus">未认证</p><p v-if="certificatingStatus">认证中</p><p v-if="certificatedStatus">已认证</p><div class="edit-btn" @click="realNameStatus=true"><em>实名认证</em></div>
        </li>
        <li class="common sign">
          <span>签名管理</span><p><img :src="usefulData.signatureUrl"/></p><div class="edit-btn" @click="signatureStatus=true"><em>编辑</em></div>
        </li>
        <li class="common account">
          <span>账号安全</span><div class="edit-btn" @click="passwordStatus=true"><em>修改密码</em></div>
        </li>
      </ul>
      <div class="attention">
        <i>*</i><p>接受期权授予协议，必须要完成实名认证才能顺利签字。</br>实名认证审核时间约为1个工作日 ，请您合理安排认证时间，避免耽误签字。</p>
      </div>
      <!--修改邮箱弹窗 start-->
      <el-dialog v-if="!userEmail" title="修改邮箱" :visible.sync="userPassword" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="请输入密码" :label-width="usefulData.formLabelWidth" required>
            <el-input v-model.trim="usefulData.password" placeholder="请输入账号密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userPassword = false">取 消</el-button>
          <el-button type="primary" @click="editEmail">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-if="userEmail" title="修改邮箱" :visible.sync="userEmail" size="tiny" :before-close="handleClose">
        <el-form :model="usefulData">
          <el-form-item label="修改邮箱" :label-width="usefulData.formLabelWidth" required>
            <el-input type="email" v-model.trim="usefulData.newEmail" placeholder="请输入新的邮箱地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userEmail = false">取 消</el-button>
          <el-button type="primary" @click="userEmail = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改邮箱弹窗 end-->
      <!--手机解绑弹窗 start-->
      <el-dialog v-if="!userTel" title="手机解绑" :visible.sync="userPassword" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="请输入密码" :label-width="usefulData.formLabelWidth" required>
            <el-input v-model.trim="usefulData.password" placeholder="请输入账号密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userPassword = false">取 消</el-button>
          <el-button type="primary" @click="editTel">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-if="userTel" title="手机解绑" :visible.sync="userTel" size="tiny" :before-close="handleClose">
        <!--这里需要处理一个逻辑，当点击确定解绑成功，当点击取消，就解绑不成功！！！-->
        <h4 class="success">验证成功!</h4>
        <p class="des">解除绑定后您将无法用当前绑定手机号继续登录股书平台并接收相关信息。<br/>是否确定要接除绑定？</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userTel = false">取 消</el-button>
          <el-button type="primary" @click="editUnlinkTel">确 定</el-button>
        </span>
      </el-dialog>
      <!--手机解绑弹窗 end-->
      <!--手机绑定弹窗 start-->
      <el-dialog v-if="linkTel" title="手机绑定" :visible.sync="linkTel" size="tiny" :before-close="handleClose">
        <el-form :model="usefulData" :rules="rules">
          <el-form-item prop="newTel" label="手机号" :label-width="usefulData.formLabelWidth" required>
            <el-input type="tel" v-model.number.trim="usefulData.newTel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="telCode" label="手机验证码" :label-width="usefulData.formLabelWidth" class="tel-code" required>
            <!--这里需要做一个处理，掉接口判断手机验证码正确与否-->
            <el-input v-model.trim="usefulData.telCode" placeholder="请输入手机验证码" class="tel-code"></el-input><el-button>发送验证码</el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="linkTel = false">取 消</el-button>
          <el-button type="primary" @click="linkTel = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--手机绑定弹窗 end-->
      <!--实名认证弹窗 start-->
      <el-dialog v-if="realNameStatus" title="实名认证" :visible.sync="realNameStatus" size="small" :before-close="handleClose">
        <el-form :model="usefulData" :rules="rules">
          <el-form-item label="真实姓名" :label-width="usefulData.formLabelWidth" required>
            <el-input v-if="firstCertificateStatus" v-model.trim="usefulData.confirmRealName" placeholder="请输入您的真实姓名"></el-input>
            <el-input v-else v-model.trim="usefulData.confirmRealName" disabled></el-input>
          </el-form-item>
          <el-form-item label="证件号" :label-width="usefulData.formLabelWidth" class="ids" required>
            <el-row :gutter="10" class="ids-row">
              <el-col :span="7">
                <el-select v-if="firstCertificateStatus" v-model="usefulData.idValue" clearable placeholder="请选择" @change="changeItem">
                  <el-option
                    v-for="item in certificateLists"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-select v-else v-model="usefulData.idValue" clearable placeholder="请选择" @change="changeItem" disabled>
                  <el-option
                    v-for="item in certificateLists"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="17" v-if="firstCertificateStatus">
                <el-input v-if="passportStatus" v-model.trim="usefulData.passportNo" placeholder="请输入您的证件号"></el-input>
                <el-input v-if="idStatus" v-model.trim="usefulData.idNo" placeholder="请输入您的证件号"></el-input>
              </el-col>
              <el-col :span="17" v-else>
                <el-input v-if="passportStatus" v-model.trim="usefulData.passportNo" disabled></el-input>
                <el-input v-if="idStatus" v-model.trim="usefulData.idNo" disabled></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="手持证件照" :label-width="usefulData.formLabelWidth" class="hand-photo">
            <el-row :gutter="15">
              <el-col :span="10">
                <img v-if="usefulData.handheldIdCardImgUrl" :src="usefulData.handheldIdCardImgUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/hand-idphoto.png"/>
                </i>
                <!--认证失败icon-->
                <em v-if="certificateFailStatus" class="fail-mark">
                  <img src="../../../assets/icon-certificateIng.png"/>
                </em>
                <!--认证成功icon-->
                <em v-if="certificatedStatus" class="success-mark">
                  <img src="../../../assets/icon-certificated.png"/>
                </em>
                <!--认证中icon-->
                <em v-if="certificatingStatus" class="ing-mark">
                  <div><span>认证中</span></div>
                </em>
                <el-upload
                  v-if="firstCertificateStatus"
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
              <el-col :span="14">
                <p>注意：<br/>选取纯色干净背景拍摄<br/>手臂和脸部完全露出无遮挡<br/>证件全部信息清晰无遮挡</p>
                <!--<div>或
                  <el-tooltip placement="top">
                    <div slot="content"></div>
                    <el-button>扫描二维码拍照上传</el-button>
                  </el-tooltip>
                </div> -->
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="证件正反面" :label-width="usefulData.formLabelWidth">
            <el-row :gutter="10" class="two-upload">
              <el-col :span="10">
                <img v-if="usefulData.idCardImgPositiveUrl" :src="usefulData.idCardImgPositiveUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/id-img.png"/>
                </i>
                <!--认证失败icon-->
                <em v-if="certificateFailStatus" class="fail-mark">
                  <img src="../../../assets/icon-certificateIng.png"/>
                </em>
                <!--认证成功icon-->
                <em v-if="certificatedStatus" class="success-mark">
                  <img src="../../../assets/icon-certificated.png"/>
                </em>
                <!--认证中icon-->
                <em v-if="certificatingStatus" class="ing-mark">
                  <div><span>认证中</span></div>
                </em>
                <el-upload
                  v-if="firstCertificateStatus"
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
              <el-col :span="10">
                <img v-if="usefulData.idCardImgNegativeUrl" :src="usefulData.idCardImgNegativeUrl">
                <i v-else class="avatar-uploader">
                  <img src="../../../assets/id-img.png"/>
                </i>
                <!--认证失败icon-->
                <em v-if="certificateFailStatus" class="fail-mark">
                  <img src="../../../assets/icon-certificateIng.png"/>
                </em>
                <!--认证成功icon-->
                <em v-if="certificatedStatus" class="success-mark">
                  <img src="../../../assets/icon-certificated.png"/>
                </em>
                <!--认证中icon-->
                <em v-if="certificatingStatus" class="ing-mark">
                  <div><span>认证中</span></div>
                </em>
                <el-upload
                  v-if="firstCertificateStatus"
                  class="avatar-uploader-icon upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">上传并预览
                </el-upload>
              </el-col>
              <el-col :span ="4">
                <p>注意：</br>证件全部信息清晰无遮挡</p>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!--从未被认证-->
          <el-button v-if="firstCertificateStatus" @click="firstCertificate">认证</el-button>
          <!--认证中-->
          <el-button v-if="certificatingStatus" @click="certificattIng">关闭</el-button>
          <!--认证成功-->
          <el-button v-if="certificatedStatus" @click="successCertificate">关闭</el-button>
          <!--认证失败-->
          <el-button v-if="certificateFailStatus" @click="reCreCertificate">重新认证</el-button>
        </span>
      </el-dialog>
      <!--实名认证弹窗 end-->
      <!--修改密码弹窗 start-->
      <el-dialog v-if="passwordStatus" title="修改密码" :visible.sync="passwordStatus" size="tiny" :before-close="handleClose">
        <p class="des">为保障您的账号安全，请输入账号密码进行验证</p>
        <el-form :model="usefulData">
          <el-form-item label="旧密码" :label-width="usefulData.formLabelWidth" required>
            <el-input v-model.trim="usefulData.password" placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" :label-width="usefulData.formLabelWidth" required>
            <el-input v-model.trim="usefulData.newPassword" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="usefulData.formLabelWidth" required>
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
          <el-button @click="passwordStatus = false">取 消</el-button>
          <el-button type="primary" @click="passwordStatus = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改密码弹窗 end-->
      <!--签名管理弹窗 start-->
      <el-dialog v-if="signatureStatus" title="签名管理" :visible.sync="signatureStatus" size="tiny" :before-close="handleClose">
        <!--初始进来的签名-->
        <p class="des" v-if="firstSinStatus">当前签名样式为：</p>
        <el-form v-if="firstSinStatus" :model="usefulData">
          <div class="sign-border"></div>
        </el-form>
        <span v-if="firstSinStatus" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editSign">编辑签名</el-button>
          <el-button @click="signatureStatus = false">关闭</el-button>
        </span>
        <!--签名编辑-->
        <h4 class="des" v-if="editSinStatus">您可通过以下3种方式提供您的签名</h4>
        <el-form v-if="editSinStatus" :model="usefulData" class="edit-sign">
          <!-- <el-tabs v-model="defaultItem" type="card" @tab-click="handleClick"> -->
          <el-tabs v-model="usefulData" type="card">
            <el-tab-pane label="输入签名" name="first">
              <div class="first">
                <el-input type="text"></el-input>
                <span>您在此输入您的真实姓名以完成数字签名</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="微信扫描签名" name="second">
              <div class="second">
                <p>使用手机扫描
                  <el-tooltip class="item" effect="light" placement="right-start">
                    <div slot="content">
                      <img src="../../../assets/id-img.png"/>
                      <p>使用手机扫描以上二维码,在手机上完成拍摄</p>
                    </div>
                    <el-button>二维码</el-button>
                  </el-tooltip>
                  ,在手机上完成签名后可在右侧预览</p>
                <h5>预览</h5>
                <div class="border"></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="上传签名" name="third">
              <div class="third">
                <p>请将您的签名写到 A4 纸上，然后用相机或手机拍照再上传。目前只支持背景透明的 png 图片与白色背景的 jpg 图片。请确保上传的图片为纯白色或透明背景。</p>
                <p>
                  <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"><el-button type="primary">上传</el-button>
                  </el-upload>
                  <el-tooltip class="item" effect="light" placement="right-start">
                    <div slot="content">
                      <img src="../../../assets/id-img.png"/>
                      <p>使用手机扫描以上二维码,在手机上完成拍照</p>
                    </div>
                    <el-button>或扫描二维码</el-button>
                  </el-tooltip>上传
                </p>
                <div class="up-des">
                  <h5>预览</h5>
                  <em @click="rotateImg">旋转纠正图层</em>
                </div>
                <div class="border avatar-uploader">
                  <img v-if="usefulData.upLoadSignImg" :src="usefulData.upLoadSignImg" ref="realSignImg">
                  <img v-else :src="usefulData.upLoadSignImg1" ref="realSignImg1"/>
                  <!-- <i v-else class="avatar-uploader">
                    <img src="../../../assets/id-img.png"/>
                  </i> -->
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
        <span v-if="editSinStatus" slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveEditSign">保存</el-button>
          <el-button @click="closeEditSign">关闭</el-button>
        </span>
      </el-dialog>
      <!-- <el-dialog v-if="userEmail" title="修改邮箱" :visible.sync="userEmail" size="tiny" :before-close="handleClose">
        <el-form :model="usefulData">
          <el-form-item label="修改邮箱" :label-width="usefulData.formLabelWidth" required>
            <el-input type="email" v-model.trim="usefulData.newEmail" placeholder="请输入新的邮箱地址"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="userEmail = false">取 消</el-button>
          <el-button type="primary" @click="userEmail = false">确 定</el-button>
        </span>
      </el-dialog> -->
      <!--签名管理弹窗 end-->
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
    const phone = this.usefulData.phone;
    this.usefulData.xingTel = `${phone.substr(0, 3)}****${phone.substr(7)}`;
  },
  data() {
    return {
      certificateLists: [
        {
          value: '0',
          label: '身份证',
        }, {
          value: '1',
          label: '护照',
        },
      ],
      defaultItem: 'first', // 默认进来第一个展示
      signatureStatus: false, // 默认进来签名管理弹窗是不可见的
      firstSinStatus: true, // 默认进来首次签名结果是展示的
      editSinStatus: false, // 默认进来编辑签名不可见
      isNameEdit: false,
      userPassword: false, // 默认输入用户密码弹窗是不可见的
      userEmail: false, // 默认用户邮箱弹窗是不可见的
      userTel: false, // 默认进来用户手机号弹窗是不可见的
      passwordStatus: false, // 默认修改密码不可见
      unlinkTel: false, // 默认进来手机解绑为false
      linkTel: false, // 默认进来手机号未绑定
      editStatus: false, // 默认输入框是不可编辑的
      changeNick: false, // 默认昵称是不可编辑的
      telCodeStatus: false, // 手机验证码状态
      realNameStatus: false, // 默认进来实名认证弹窗是不可见状态
      certificatedStatus: false, // 默认进来认证成功不可见（以下三个需要调用接口来做判断）
      certificatingStatus: false, // 默认认证中也不可见
      certificateFailStatus: false, // 默认认证失败也不可见
      firstCertificateStatus: true, // 未被认证过，初次认证
      idStatus: true, // 身份证被选中
      passportStatus: false, // 默认护照没有被选中
      usefulData: {
        upLoadSignImg: '', // 上传的签名图片地址
        rotate: 0, // 默认进来没有做旋转
        upLoadSignImg1: 'http://static9.photo.sina.com.cn/orignal/4af8a5e8856933841a998', // 临时房的一个签名图片地址
        idValue: '', // 证件类型
        oldName: '沙枫',
        portrait: '', // 头像
        username: '沙枫', // 用户昵称
        id: '', // 用户id必填
        idCardImgPositiveUrl: 'http://mpic.tiankong.com/cdd/23c/cdd23c7d1bfd4520859cfd3772772023/640.jpg', // 正面证件照
        idCardImgNegativeUrl: 'http://mpic.tiankong.com/cbf/7a6/cbf7a638d38760e0dfc90f6b6cd6983d/640.jpg', // 背面证件照
        imageUrl: 'http://mpic.tiankong.com/d86/95e/d8695e63c2c23f57bb7d89cb3fd2e161/640.jpg', // 手持证件照,没有这个字段
        handheldIdCardImgUrl: '', // 手持证件照地址默认为空
        signatureUrl: '../../../assets/sign-img.png', // 签名
        idNumber: '', // 证件号码
        idType: 0, // id类型／0身份证／1护照
        lastPasswordResetDate: '', // 最后一次修改密码的时间
        licenseList: '', // 许可（ROLE_USER的权限)
        password: '123', // 临时账号密码
        newPassword: '', // 修改后的密码
        confirmPassword: '', // 确认的新密码
        newEmail: '', // 变更后的邮箱地址
        email: '675714031@qq.com', // 默认邮箱地址为空
        xingEmail: '', // 被截取后的邮箱地址
        phone: '15010841736', // 手机号
        newTel: '', // 验证码手机号新的手机号
        xingTel: '', // 被截取后的手机号
        formLabelWidth: '95px',
        telCode: '', // 默认手机验证码
        confirmRealName: '沙枫', // 输入的实名
        realName: '', // 实名认证的实名
        idNo: '', // 身份证号
        passportNo: '', // 护照号码
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
      this.usefulData.oldName = this.usefulData.username;
    },
    nameEditSave() {
      this.isNameEdit = !this.isNameEdit;
      // 请求接口，如果成功的话，将username值更新，要是失败的话，还是返回oldName;
    },
    // 编辑邮箱弹窗
    editEmail() {
      this.userPassword = false;
      this.userEmail = true; // 邮箱弹出
      // 这个地方需要做验证，当用户密码对上了，设置userPassword为true,这样切换弹窗里的内容
    },
    // 编辑手机解绑弹窗
    editTel() {
      this.userPassword = false;
      this.userTel = true; // 邮箱弹出
      // 这个地方需要做验证，当用户密码对上了，设置userPassword为true,这样切换弹窗里的内容
    },
    // 手机解绑确认
    editUnlinkTel() {
      this.userTel = false;
      this.unlinkTel = true; // 手机解绑成功
      // this.linkTel = true; // 手机号未被绑定为true
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
      }
      // else if (value && false) {
      //   // 这里需要调用手机验证码接口来做判断
      //   result = callback(new Error('请输入正确的验证码！'));
      // }
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
    changeItem(item) { // 当发生选中的时候触发的
      if (item === 0) { // 如果是身份证
        this.passportStatus = false;
        this.idStatus = true;
      }
      if (item === 1) { // 护照
        this.passportStatus = true;
        this.idStatus = false;
      }
    },
    firstCertificate() { // 第一次被认证
      this.realNameStatus = false; // 认证弹窗关闭
      this.firstCertificateStatus = false; // 第一次被认证设置为false
      this.certificatingStatus = true; // 此时进入认证中阶段
    },
    certificattIng() { // 认证中的操作
      this.realNameStatus = false; // 关闭认证弹窗
    },
    reCreCertificate() { // 认证失败，重新认证
      this.certificatingStatus = false; // 此时认证中阶段结束
      this.certificateFailStatus = false; // 此时认证失败已经结束
      this.firstCertificateStatus = true; // 此时重回未被认证阶段，显示首次认证内容
    },
    successCertificate() { // 认证成功
      this.certificatingStatus = false; // 此时认证中阶段结束
      this.certificatedStatus = true; // 认证成功
      this.realNameStatus = false; // 认证弹窗关闭
    },
    editSign() { // 编辑签名
      this.editSinStatus = true; // 编辑签名弹窗打开
      this.firstSinStatus = false; // 编辑签名打开后，初始进来签名不可见
    },
    closeEditSign() { // 关闭编辑签名
      this.firstSinStatus = true; // 编辑签名关闭后，初始签名以后打开仍然是可见的
      this.editSinStatus = false; // 编辑签名弹窗关闭
      this.signatureStatus = false; // 签名窗口关闭
    },
    saveEditSign() { // 保存编辑签名
      // 此时调用签名的update接口
      this.firstSinStatus = true; // 编辑签名关闭后，初始签名以后打开仍然是可见的
      this.editSinStatus = false; // 编辑签名弹窗关闭
      this.signatureStatus = false; // 签名窗口关闭
    },
    rotateImg() { // 图片旋转功能
      this.usefulData.rotate = (this.usefulData.rotate + 90) % 360;
      console.log(this.$refs);
      // this.$refs.realSignImg.style.transform = `rotate(${this.usefulData.rotate}deg)`;
      this.$refs.realSignImg1.style.transform = `rotate(${this.usefulData.rotate}deg)`;
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
  padding: 20px;
  margin-bottom: 10px;
  line-height: 100% !important;
  background: #f1f2f3;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
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
  border: 1px dashed #EBEBEB;
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
.el-form-item__content {
  line-height: 40px !important;
}
.el-row p {
  line-height: 20px;
  font-size: 12px;
  color: #a8b0c6;
}
.el-col-10 {
  position: relative;
}
.el-col-10 img {
  width: 100%;
  height: auto;
}
.ing-mark {
  position: absolute;
  right: 0;
  bottom: 12px;
  width: 100%;
  padding: 0 5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.ing-mark div {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: #2e76df;
  -webkit-opacity: 0.6; 
  -moz-opacity: 0.6;
  -khtml-opacity: 0.6;
  opacity: .6;
  filter:alpha(opacity=60);
  -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
  filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
  font-style: normal;

}
.ing-mark span {
  display: block;
  font-size: 14px;
  color: #fff;
  text-align: center;
}
.success-mark, .fail-mark {
  position: absolute;
  right: 5px;
  bottom: 0;
  width: 40%;
}
.success-mark img, .fail-mark img {
  width: 100%;
  height: auto;
}
.el-tabs__item.is-active {
  color: #546AAC;
}
.first .el-input {
  width: 100% !important;
  height: 100px !important;
}
.first span {
  display: block;
  text-align: center;
  margin: 5px 0 10px;
}
.second span {
  color: #546AAC;
}
.second h5 {
  margin: 10px 0;
}
.second .border {
  width: 100%;
  height: 140px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #EBEBEB;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.el-tooltip__popper div {
  padding: 10px 15px !important;
}
.el-tooltip__popper div img {
  width: 100%;
  height: auto;
}
.el-tooltip__popper div p{
  margin: 10px 0;
  color: #546AAC;
  text-align: center;
}
.second .el-button, .third p>button {
  padding: 0 !important;
  border: 0 none;
  color: #546AAC !important;
}
.third p div, .third p button {
  display: inline-block;
}
.up-des {
  overflow: hidden;
  margin: 10px 0 8px;
}
.up-des h5 {
  float: left;
}
.up-des em {
  float: right;
  font-style: normal;
  color: #546AAC;
}
.border.avatar-uploader, .sign-border {
  height: 140px;
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #EBEBEB;
  text-align: center;
}
.border.avatar-uploader img, .second .border img, .sign-border img {
  width: 120px;
  height: 120px;
}
.el-tooltip__popper.is-light {
  border: 1px solid #EBEBEB !important;
}
</style>
