<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu"><span class="title">管理期权</span>
          <router-link class="return" :to="{ path: '/option/management_list' }">&lt;返回</router-link>
        </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <div class="option-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">
            <el-input placeholder="搜索持有人" icon="search"></el-input>
          </span>
          
          <el-button class="addbtn" type="primary" clic>
            <router-link :to="{ path: '/option/managementList/optionsGgranted1' }">授予</router-link>
          </el-button>
          <el-button class="addbtn" type="info">导入/导出</el-button>
        </div>
        <div class="table-wrap">
          <el-table>
            <el-table-column label="持有人名称"></el-table-column>
            <el-table-column label="邮箱"></el-table-column>
            <el-table-column label="状态"></el-table-column>
            <el-table-column label="剩余数量（股）"></el-table-column>
            <el-table-column label="成熟计划"></el-table-column>
            <el-table-column label="可行权（股）"></el-table-column>
            <el-table-column label="授予日期"></el-table-column>
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
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
.option-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;margin: 0 5px;border-radius: 2px;}
.table-wrap{margin:20px 0 0;}
</style>
