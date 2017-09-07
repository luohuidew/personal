<template>
  <div class="user-my-order">
    <div class="title"><span>我的订单</span> <span @click="toRenew">续费及购买 &gt;</span></div>
    <el-row :gutter="20" class="m-el-row">
      <el-col :span="6">
        <div class="row1">支持参与方数量 <span>10人</span></div>
        <div class="row2">剩余人数  <span>0</span><span>0</span><span>3</span></div>
      </el-col>
      <el-col :span="6">
        <div class="row1">使用期限截止日期 <span> 2018-06-09</span></div>
        <div class="row2">剩余天数  <span>3</span><span>1</span><span>3</span></div>
      </el-col>
      <el-col :span="12">
        <div class="row1">&nbsp;</div>
        <div class="row2">
          <el-button type="primary">升 级</el-button>
          <i>当前服务不满足您的需求时可进行上级，仅需补齐差价，使用截止日期不变</i>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="参与方">
      </el-table-column>
      <el-table-column
        prop="address"
        label="服务名称">
      </el-table-column>
      <el-table-column
        prop="a"
        label="开通时长">
      </el-table-column>
      <el-table-column
        prop="b"
        label="有效期至">
      </el-table-column>
      <el-table-column
        prop="c"
        label="付费总额">
      </el-table-column>
      <el-table-column
        prop="c"
        label="付款方式">
      </el-table-column>
      <el-table-column
        prop="c"
        label="是否发票">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'user-my-order',
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    toRenew() {
      this.$router.push({ name: 'UserRenew' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-my-order {
    background: #fff;
    padding: 30px;
  }

  .title span:first-child {
    font-weight: bold;
    font-size: 16px;
    letter-spacing: 1.14px;
  }

  .title span:last-child {
    color: #FFCA57;
    letter-spacing: 1.14px;
    margin-left: 20px;
    cursor: pointer;
  }

  .m-el-row {
    margin:30px 0;
  }

  .row1,.row2 {
    color: #999;
  }
  .row1 span {
    font-weight: bold;
    color: #666;
  }
  .row2{
    margin-top: 20px;
  }
  .row2 span {
    display: inline-block;
    height: 40px;
    width: 30px;
    border-radius: 2px;
    background: #7d96e0;
    margin-left: 10px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }

  i{
    font-style: normal;
    margin-left: 10px;
  }
</style>
