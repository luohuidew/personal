<template>
  <div class="user-renew">
    <div class="title"> <span class="back" @click="back">&lt; 返回</span> <span class="title-text">续费及购买</span></div>
    <div class="content">
      <el-form :model="form">
        <el-form-item label="参与方人数" :label-width="formLabelWidth">
          <el-select v-model="form.a" placeholder="请选择参与方人数">
            <el-option label="1-5" value="shanghai"></el-option>
            <el-option label="6-10" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开通年数" :label-width="formLabelWidth" required>
          <el-select v-model="form.a" placeholder="请选择开通年数">
            <el-option label="1年" value="shanghai"></el-option>
            <el-option label="2年" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务项目" :label-width="formLabelWidth">
          <div class="tip">在线生成并签署全套法律文件</div>
          <div class="tip">专业流程引导期权发放及管理</div>
          <div class="tip">基于行业标准和大数据的发放建议</div>
          <div class="tip">员工可在个人资产中随时查看期权状态</div>
        </el-form-item>
        <el-form-item label="总金额" :label-width="formLabelWidth">
          <div class="tip">2，918 元</div>
        </el-form-item>
        <el-form-item label="优惠券" :label-width="formLabelWidth">
          <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label="实付金额" :label-width="formLabelWidth">
          <div class="tip"><span>2，980</span> 元</div>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <img @click="checkZhifu" v-if="!zhifubao" class="zhifu" src="../../../../assets/zhifubao.png" alt="支付宝">
          <img @click="checkZhifu" v-if="zhifubao" class="zhifu" src="../../../../assets/zhifubao-checked.png" alt="支付宝">
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-button type="primary">去 支 付</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user-renew',
    data() {
      return {
        form: {
          a: '',
        },
        formLabelWidth: '120px',
        zhifubao: true,
      };
    },
    methods: {
      checkZhifu() {
        this.zhifubao = !this.zhifubao;
      },
      back() {
        window.history.back();
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    margin: -20px -20px 30px -20px;
    background: #fff;
    height: 60px;
    line-height: 60px;
    box-shadow: 0 2px 4px #ececec;
    text-align: center;
    overflow: hidden;
  }

  .back {
    margin-left: 30px;
    color: #999999;
    letter-spacing: 1.14px;
    float: left;
    cursor: pointer;
  }

  .title-text {
    font-size: 16px;
    color: #666666;
    letter-spacing: 1.97px;
    font-weight: bold;
  }

  .content {
    overflow: hidden;
    background: #fff;
    padding: 30px;
  }

  .el-form {
    width: 420px;
    margin: 0 auto;
  }

  .tip {
    color: #72787B;
  }

  .tip span {
    font-size: 20px;
    color: #F66E68;
    letter-spacing: 1.63px;
    font-weight: bold;
  }

  .zhifu {
    width: 138px;
    height: 55px;
    cursor: pointer;
  }
</style>
