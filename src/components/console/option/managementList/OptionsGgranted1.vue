<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu"><span class="title">授予（共2步，1/2）</span>
          <router-link class="return" :to="{ path: '/option/managementList/managerialOptionList' }">&lt;返回</router-link>
        </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <div class="option-list bgcolor">
        <el-row :gutter="20">
          <el-col :span="12" :offset="6">
            <el-form ref="form" label-width="80px">
              <el-form-item label="活动名称">
                <el-input></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-select placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        
       
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
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
.option-cont{margin:20px 0 0;}
.echart-warp{min-height: 180px;}
.option-list{max-height:100%;padding:30px 0 50px 30px;margin: 0 auto;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;margin: 0 5px;border-radius: 2px;}
.table-wrap{margin:20px 0 0;}
</style>