<template>
  <div>
    <el-table :data="treeDataMap" class="stock-tree-list">
      <el-table-column type="expand">
        <template scope="props">
          <el-table ref="expandTable" :data="props.row.children" inline :show-header="false" :border="false">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="shareholderName"></el-table-column>
            <el-table-column>
              <template scope="scope">
                <ul class="round-wrap">
                  <li v-for="item in roundType" v-bind:class="{active: checkRound(item.id, scope.row.rounds)}">{{item.text}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column prop="registeredCapital"></el-table-column>
            <el-table-column prop="rate"></el-table-column>
            <el-table-column>
              <template scope="scope"><el-button @click="delete(scope.row)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="shareholderAbbreviation" label="股东名称"></el-table-column>
      <el-table-column label="投资轮次">
        <template scope="scope">
          <ul class="round-wrap">
            <li v-for="item in roundType" v-bind:class="{active: checkRound(item.id, scope.row.rounds)}">{{item.text}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column prop="registeredCapital" label="注册资本"></el-table-column>
      <el-table-column prop="rate" label="股份比例"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope"><el-button @click="delete(scope.row)">删除</el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import stockServer from '../../../../service/stock';
import { ROUND_TYPE } from '../../../../data/constants';

export default {
  name: 'tree-table',
  data() {
    return {
      totalMoney: '140000',
      treeDataMap: [],
      roundType: ROUND_TYPE,
    };
  },
  props: ['treelistdata'],
  created() {
    this.treeDataMap = this.treelistdata;
  },
  methods: {
    getPercent(num, total) {
      const number = parseFloat(num);
      const totals = parseFloat(total);
      if (isNaN(number) || isNaN(totals)) {
        return '-';
      }
      if (totals < 0) {
        return '0%';
      }
      const rate = Math.round((number / totals) * 10000) / 100.00;
      return `${rate}%`;
      // return totals <= 0 ? '0%' : ((Math.round((number / totals) * 10000) / 100.00) + '%');
    },
    delete(row) {
      console.log(row);
    },
    checkRound(r, rounds) {
      const roundList = rounds.split(',');
      return roundList.includes(r);
    },
  },
};
</script>
<style scoped>
.el-table__expanded-cell{padding: 0px;}
.el-table td > div{border: none;}
.el-table__expanded-cell .el-table th.is-leaf, .el-table td{border:none;}
</style>

