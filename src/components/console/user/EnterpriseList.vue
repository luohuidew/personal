<template>
  <div class="user-enterprise-list">
    <div class="add-new" @click="openDialog">
      <img src="../../../assets/icon-add.png" alt="">
      <span>新建企业</span>
    </div>
    <!---->
    <div class="enterprise-box" v-for="item in companyList" @click="selectCompany(item)">
      <p class="e-title">
        <span class="e-title-name" :title=item.companyName>{{item.companyName}}</span>
        <span class="author">管理员</span>
        <span class="wrz" v-if="item.authentication == 1">未认证</span>
        <span class="wrz" v-if="item.authentication == 3">认证失败</span>
        <span class="wfk" v-if="item.pay == 1">未付款</span>
      </p>
      <p class="row"><img src="../../../assets/icon-manager.png" alt=""><span>管理员：</span><span>{{item.adminName}}</span></p>
      <p class="row"><img src="../../../assets/business-type.png" alt=""><span>企业类型：</span><span>{{item.companyType}}</span></p>
      <p class="row"><img src="../../../assets/capital-currency.png" alt=""><span>资本币种：</span><span>{{item.currency}}</span></p>
    </div>
    <!---->
    <el-dialog title="新建企业" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="企业全称" :label-width="formLabelWidth" required>
          <el-input v-model="form.a" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form.b" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" :label-width="formLabelWidth" required>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button size="small" type="primary">上传营业执照扫描件</el-button>
          </el-upload>
          <div class="tips">
            <p>1.选择项(企业认证时必需)</p>
            <p>2.仅支持JPG、PNG格式</p>
            <p>3.文件不超过5M</p>
            <p>4.请上传营业执照原件</p>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save"> 确 认 </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import company from '../../../service/company';

export default {
  name: 'user-enterprise-list',
  data() {
    return {
      companyList: [],
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        a: '',
        b: '',
      },
      fileList: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      company.getCompanyListByUid().then((resp) => {
        this.companyList = resp.data;
      });
    },
    selectCompany(cItem) {
      this.storeSelectedCompany(cItem);
      this.$router.push({ name: 'OptionManagementList' });
    },
    storeSelectedCompany(cItem) {
      const obj = {
        authority: cItem.authority,
        licenseList: cItem.licenseList,
        companyList: {
          companyName: cItem.companyName,
          companyType: cItem.companyType,
        },
      };
      company.setStoreCompany(obj);
    },
    openDialog() {
      this.dialogVisible = true;
    },
    save() {
      this.dialogVisible = false;
    },
    handleClose() {
    },
    handleRemove() {
    },
    handlePreview() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  * {
    box-sizing: border-box;
  }

  .user-enterprise-list {
    background: #fff;
    overflow: hidden;
    padding-bottom: 30px;
  }

  .add-new,.enterprise-box {
    float: left;
  }

  .add-new,.enterprise-box:hover {
    background: #FCFCFC;
    cursor: pointer;
  }

  .add-new {
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    border: 1px solid #eee;
    margin: 30px 0 0 30px;
    color: #BDBDBD;
    position: relative;
    cursor: pointer;
  }

  .add-new>span {
    position: absolute;
    top:30px;
    left: 70px;
  }

  .enterprise-box {
    width: 500px;
    height: 200px;
    border: 1px solid #eee;
    margin: 30px 0 0 30px;
  }

  .e-title {
    height: 60px;
    line-height: 60px;
    width: 100%;
    background: #eee;
    font-size: 16px;
  }

  .e-title span.e-title-name{
    float: left;
    margin-left: 30px;
    letter-spacing: 0.8px;
  }

  .e-title span.author{
    float: right;
    margin-right: 20px;
    color: #2E76E0;
    letter-spacing: 0.8px;
    cursor: pointer;
  }

  .e-title span.wrz, .e-title span.wfk{
    float: right;
    margin-right: 10px;
    font-size: 14px;
    color: #FF5151;
    text-decoration: underline;
    cursor: pointer;
  }
  .e-title span.wrz:hover,.e-title span.wfk:hover{
    color: #BC5231;
  }

  .e-content:hover {
    background: #FDFDFD;
  }

  .row {
    margin: 20px 20px 0 30px;
    color: #999;
  }

  .row > img {
    vertical-align: middle;
    margin-right: 15px;
  }

  .el-upload .el-button--primary{
    width: 300px;
    height: 40px;
    color: #999;
    background-color: #f4f4f4;
    border-color: #f4f4f4;
    font-size: 14px;
  }

  .tips {
    margin-top: 10px;
    font-size: 12px;
    color: #BDBDBD;
    letter-spacing: 0.59px;
    line-height: 20px;
  }

  .e-title-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:210px;
  }

</style>
