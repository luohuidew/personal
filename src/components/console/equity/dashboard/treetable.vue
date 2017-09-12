<template>
  <div>
    <el-table :data="treeDataMap" class="stock-tree-list">
      <el-table-column type="expand">
        <template scope="props">
          <el-table ref="expandTable" :data="props.row.children" inline :show-header="false" :border="false">
            <el-table-column type="index" width="55"></el-table-column>
            <el-table-column prop="shareholderName"></el-table-column>
            <el-table-column prop="rounds"></el-table-column>
            <el-table-column prop="registeredCapital"></el-table-column>
            <el-table-column prop="rate"></el-table-column>
            <el-table-column>
              <template scope="scope"></template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column v-for="(column, index) in treeClomns" :label="column.text" :key="column.dataIndex">
        <template scope="scope">
          {{scope.row[column.dataIndex]}}
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import stockServer from '../../../../service/stock';

export default {
  name: 'tree-table',
  data() {
    return {
      totalMoney: '140000',
      treeDataMap: [],
    };
  },
  props: {
    treeClomns: {},
  },
  created() {
    // console.log('1111111111', this.treeDataMap);
    const id = '123456';
    stockServer.getAll(id).then((resp) => {
      this.treeDataMap = resp.data;
      resp.data.forEach((value, index) => {
        if (value.children.length !== 0) {
          value.children.forEach((key, i) => {
            const rate = this.getPercent(key.registeredCapital, this.totalMoney);
            this.treeDataMap[index].children[i].rate = rate;
          });
        }
        const r = this.getPercent(value.registeredCapital, this.totalMoney);
        this.treeDataMap[index].rate = r;
      });
    }, (resp) => {
      console.log('aaaaaaaaaa', resp);
    });
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
  },
};
</script>
<style scoped>
.el-table__expanded-cell{padding: 0px;}
.el-table td > div{border: none;}
.el-table__expanded-cell .el-table th.is-leaf, .el-table td{border:none;}
</style>

