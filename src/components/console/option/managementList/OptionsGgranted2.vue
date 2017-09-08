<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span class="title">授予（共2步，2/2）</span>
            <router-link class="return" :to="{ path: '/option/managementList/optionsGgranted1' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <div class="option-list bgcolor">
        这里是授予第二部的内容
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