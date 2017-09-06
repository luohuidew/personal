<template>
  <div class="user-enterprise-list">
    <div class="add-new" @click="openDialog">
      <img src="../../../assets/icon-add.png" alt="">
      <span>新建企业</span>
    </div>
    <div class="enterprise-box">
      <p class="e-title"><span>深圳市净化论科技有限公司</span><span>管理员</span></p>
      <p class="row"><img src="../../../assets/icon-manager.png" alt=""><span>管理员：</span><span>沙枫</span></p>
      <p class="row"><img src="../../../assets/business-type.png" alt=""><span>企业类型：</span><span>境内有限责任公司</span></p>
      <p class="row"><img src="../../../assets/capital-currency.png" alt=""><span>资本币种：</span><span>人民币</span></p>
    </div>
    <div class="enterprise-box">
      <p class="e-title"><span>深圳市净化论科技有限公司</span><span>管理员</span></p>
      <p class="row"><img src="../../../assets/icon-manager.png" alt=""><span>管理员：</span><span>沙枫</span></p>
      <p class="row"><img src="../../../assets/business-type.png" alt=""><span>企业类型：</span><span>境内有限责任公司</span></p>
      <p class="row"><img src="../../../assets/capital-currency.png" alt=""><span>资本币种：</span><span>人民币</span></p>
    </div>
    <el-dialog title="新建企业" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="企业全称" :label-width="formLabelWidth" required>
          <el-input v-model="form.a" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="简称" :label-width="formLabelWidth">
          <el-input v-model="form.b" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="营业执照" :label-width="formLabelWidth" required>
          <el-input v-model="form.a" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'user-enterprise-list',
  data() {
    return {
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
        a: '',
        b: '',
      },
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible = true;
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

  .add-new,.enterprise-box{
    float: left;
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
  .e-title span:first-child{
    float: left;
    margin-left: 30px;
    letter-spacing: 0.8px;
  }

  .e-title span:last-child{
    float: right;
    margin-right: 20px;
    color: #2E76E0;
    letter-spacing: 0.8px;
    cursor: pointer;
  }

  .row {
    margin: 20px 20px 0 30px;
    color: #999;
  }

  .row > img {
    vertical-align: middle;
    margin-right: 15px;
  }

</style>
