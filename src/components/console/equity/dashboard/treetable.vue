<template>
  <div>
    <el-table :data="treeDataMap" class="stock-tree-list">
      <el-table-column type="expand">
        <template scope="props">
          <el-table ref="expandTable" :data="props.row.equities" inline :show-header="false" :border="false">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="shareholderName"></el-table-column>
            <el-table-column>
              <template scope="scope">
                <ul class="round-wrap">
                  <!-- <li v-for="item in roundType" v-bind:class="{active: checkRound(item.id, scope.row.rounds)}" :key="item.id">{{item.text}}</li> -->
                  <li v-for="item in roundType" v-bind:class="{active: [scope.row.rounds].includes(item.id)}" :key="item.id">{{item.text}}</li>
                </ul>
              </template>
            </el-table-column>
            <el-table-column>
              <template scope="scope">{{scope.row.registeredCapital | moneyFormat}}</template>
            </el-table-column>
            <el-table-column>
              <template scope="scope">{{scope.row.registeredCapital | stockScalefilter(totalRegisteredCapital)}}</template>
            </el-table-column>
            <el-table-column>
              <template scope="scope"><el-button @click="deleteid(scope.row)">删除</el-button></template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="shareholderAbbreviation" label="股东名称"></el-table-column>
      <el-table-column label="投资轮次">
        <template scope="scope">
          <ul class="round-wrap">
            <li v-for="item in roundType" v-bind:class="{active: scope.row.rounds.includes(item.id)}" :key="item.id">{{item.text}}</li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="注册资本">
        <template scope="scope">{{scope.row.registeredCapital | moneyFormat}}</template>
      </el-table-column>
      <el-table-column label="股份比例">
        <template scope="scope">{{scope.row.registeredCapital | stockScalefilter(totalRegisteredCapital)}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope"><el-button @click="deleteid(scope.row)">删除</el-button></template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import stockServer from '@/service/stock';
import companyServer from '@/service/company';
import filters from '@/utils/filters';
import { ROUND_TYPE } from '@/data/constants';

export default {
  name: 'tree-table',
  data() {
    return {
      treeDataMap: [],
      roundType: ROUND_TYPE,
      totalRegisteredCapital: '',
    };
  },
  props: ['treelistdata'],
  created() {
    this.treeDataMap = this.treelistdata;
    companyServer.getCompanyInfoById().then((r) => {
      this.totalRegisteredCapital = r.totalRegisteredCapital;
    });
  },
  methods: {
    deleteid(row) {
      this.$emit('deleteFinanc', row.id);
    },
  },
  filters: {
    stockScalefilter(arg1, arg2) {
      return stockServer.getPercent(arg1, arg2);
    },
    moneyFormat(arg1 = 0) {
      return filters.moneyFilter(arg1, false);
    },
  },
};
</script>
<style scoped>
.el-table__expanded-cell{padding: 0px;}
.el-table td > div{border: none;}
.el-table__expanded-cell .el-table th.is-leaf, .el-table td{border:none;}
</style>

