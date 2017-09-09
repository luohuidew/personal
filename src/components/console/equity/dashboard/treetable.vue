<template>
  <div>
    <el-table :data="treeData">
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
          <!-- <span class="el-icon-arrow-right"></span>
          <span class="el-icon-arrow-down"></span> -->
          {{scope.row[column.dataIndex]}}
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tree-table',
  data() {
    return {
      totalMoney: '140000',
      treeData: [],
    };
  },
  props: {
    treeClomns: {},
  },
  created() {
    const testdata = [{
      shareholderAbbreviation: '真格基金',
      rounds: '天使轮',
      registeredCapital: '80000',
      children: [
        {
          shareholderName: '某某某科技有限公司',
          rounds: '天使轮',
          registeredCapital: '34000',
        }, {
          shareholderName: '锤子科技有限公司',
          rounds: '天使轮',
          registeredCapital: '46000',
        },
      ],
    }, {
      shareholderAbbreviation: '真格基金',
      rounds: '天使轮',
      registeredCapital: '60000',
      children: [
        {
          shareholderName: '某某某科技有限公司',
          rounds: '天使轮',
          registeredCapital: '20000',
        }, {
          shareholderName: '某某某科技有限公司',
          rounds: '天使轮',
          registeredCapital: '40000',
        },
      ],
    }];
    this.treeData = testdata;
    testdata.forEach((value, index) => {
      if (value.children.length !== 0) {
        value.children.forEach((key, i) => {
          const rate = this.getPercent(key.registeredCapital, this.totalMoney);
          this.treeData[index].children[i].rate = rate;
        });
      }
      const r = this.getPercent(value.registeredCapital, this.totalMoney);
      this.treeData[index].rate = r;
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

