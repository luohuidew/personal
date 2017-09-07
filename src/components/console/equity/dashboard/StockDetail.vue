<template>
  <div class="stock-container">
    <div class="stock-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span class="title">股权详情</span>
            <router-link class="return" :to="{ path: '/equity/dashboard' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="stock-cont">
      <div class="echart-warp bgcolor">
      </div>
    </div>
    <div class="stock-cont">
      <div class="stock-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">股权列表</span>
          <el-button class="addbtn" type="primary" @click="dialogVisible = true">新增股东</el-button>
        </div>
        <div class="table-wrap">
          <el-table :data="tableData">
            <el-table-column label="股东名称"></el-table-column>
            <el-table-column label="投资轮次"></el-table-column>
            <el-table-column label="注册资本"></el-table-column>
            <el-table-column label="股份比例"></el-table-column>
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 新增股东 -->
    <el-dialog title="添加股权信息" :visible.sync="dialogVisible" size="small" :before-close="handleClose">
      <el-form :model="stockMap">
        <el-form-item label="股东名称" :label-width="formLabelWidth" required>
          <el-input v-model="stockMap.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="股东名称" :label-width="formLabelWidth" required>
          <el-input v-model="stockMap.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="股东类型" :label-width="formLabelWidth" required>
          <el-select v-model="stockMap.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="投资轮次" :label-width="formLabelWidth" required>
          <el-select v-model="stockMap.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册资本" :label-width="formLabelWidth" required>
          <el-input v-model="stockMap.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="股份比例" :label-width="formLabelWidth" required>
          <el-input v-model="stockMap.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">继续添加</el-button>
            <el-button type="primary" @click="dialogVisible = false">确认保存</el-button>
          </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'stock-detail',
  data() {
    return {
      stockMap: {
        name: undefined,
      },
      tableData: [],  // 测试
      dialogVisible: false,
      formLabelWidth: '120px',
    };
  },
  created() {
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done();
      }).catch(() => {});
    },
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.stock-cont{margin:20px 0 0;}
.echart-warp{min-height: 180px;}
.stock-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;}
.table-wrap{margin:20px 0 0;}
</style>

