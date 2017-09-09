<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span class="title">授予（共2步，1/2）</span>
            <router-link class="return" :to="{ path: '/option/managementList/managerialOptionList' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <div class="option-list bgcolor">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="formPanel">
              <el-form ref="form" label-position='left' label-width="100px">
                <!--授予类型-->
                <el-form-item label="授予类型">
                  <el-select placeholder="请选择" size="small">
                    <el-option value="期权"></el-option>
                    <el-option value="受限股"></el-option>
                  </el-select>
                </el-form-item>
                <!--姓名-->
                <el-form-item label="姓名">
                  <el-input size="small"></el-input>
                </el-form-item>
                <!--数量-->
                <el-form-item label="数量">
                  <el-input size="mini">10,000</el-input>
                  <span class="msgRt">股  最大可用虚拟股：120,000股</span>
                  <span class="msgBottom">对应10,000.00元注册资本，占总股权1.0000%</span>
                </el-form-item>
                <!--所属持股平台-->
                <el-form-item label="所属持股平台">
                  <el-input></el-input>
                </el-form-item>
                <!--授予日期-->
                <el-form-item label="授予日期">
                  <el-date-picker type="date" size="mini" placeholder="" :picker-options="pickerOptions0"></el-date-picker>
                </el-form-item>
                <!--行权单价-->
                <el-form-item label="行权单价">
                  <el-input size="mini"></el-input>
                  <span class="msgRt">元/股</span>
                </el-form-item>
                <!--回购价格-->
                <el-form-item label="回购价格">
                  <el-radio-group size="mini">
                    <el-radio class="msgBottom" label="1">按离职/终止顾问服务前公司最后一轮融资估值的<el-input class="mini"></el-input>%进行计算</el-radio>
                    <el-radio class="msgBottom" label="2">按离职/终止顾问服务前公司前一年底净资产总额乘以拟转让股权占公司股本总额的比例</el-radio>
                    <el-radio class="msgBottom" label="3">按每年<el-input class="mini" size='mini'></el-input>%的单利计算的投资金额的本金加上利息之和</el-radio>
                    <el-radio class="msgBottom" label="4">自定义</el-radio><span><el-input type="textarea" size="mini"></el-input></span>
                  </el-radio-group>
                </el-form-item>
                <!--成熟计划-->
                <el-form-item label="成熟计划">
                  <el-input></el-input>
                  <span class="msgRt linkColor">自定义个人成熟计划&gt;</span>
                </el-form-item>
                <!--成熟起算日-->
                <el-form-item label="成熟起算日">
                  <el-date-picker type="date" size="mini" placeholder="" :picker-options="pickerOptions0"></el-date-picker>
                </el-form-item>
                <!---->
                <el-form-item class="centerPos">
                  <el-button type="success">
                    <router-link :to="{ path: '/option/managementList/optionsGgranted2' }">下一步</router-link>
                  </el-button>
                </el-form-item>
                <!---->
              </el-form>
            </div>
          </el-col>
        </el-row>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
      option: {
        type: '期权', // 授予类型
      },
    };
  },
  created() {
  },
  methods: {
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.option-cont{
  margin:20px 0 0;
}
.option-list{max-height:100%;padding:30px 0 50px 30px;margin: 0 auto;}
.formPanel{
  margin: auto;
  width: 50%;
}
.msgRt, .msgBottom{
  font-size: 14px;
  color: #999999;
  letter-spacing: 1.14px;
}
.msgBottom{
  color: #CBCBCB;
  display: block;
}
.linkColor{
  color: #33457B;
  padding-left: 10px;
}
.el-radio + .el-radio{
  margin-left: 0px;
  line-height: 40px;
}
.mini{
  width: 50px;
}
.mini .el-input__inner{
  height: 30px !important;
}
.centerPos{
  margin-left: 180px;
}
</style>