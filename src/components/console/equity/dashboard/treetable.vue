<template>
  <div>
    <el-table :data="treeData">
      <el-table-column type="expand">
        <template scope="props">
          <el-table :data="props.children" inline :show-header="false" :border="false">
            <el-table-column prop="name"></el-table-column>
            <el-table-column prop="money"></el-table-column>
            <el-table-column prop="name"></el-table-column>
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
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'tree-table',
  data() {
    return {
      treeData: [{
        shareholderAbbreviation: '真格基金',
        rounds: '天使轮',
        registeredCapital: '80000',
        rate: '0.4%',
        children: [
          {
            shareholderName: '某某某科技有限公司',
            rounds: '天使轮',
            registeredCapital: '20000',
            rate: '0.2%',
          }, {
            shareholderName: '锤子科技有限公司',
            rounds: '天使轮',
            registeredCapital: '40000',
            rate: '0.4%',
          },
        ],
      }, {
        shareholderAbbreviation: '真格基金',
        rounds: '天使轮',
        registeredCapital: '80000',
        rate: '0.4%',
        children: [
          {
            shareholderName: '某某某科技有限公司',
            rounds: '天使轮',
            registeredCapital: '20000',
            rate: '0.2%',
          }, {
            shareholderName: '某某某科技有限公司',
            rounds: '天使轮',
            registeredCapital: '40000',
            rate: '0.4%',
          },
        ],
      }],
    };
  },
  props: {
    treeClomns: {},
  },
  created() {
  },
  methods: {
  },
};
</script>
<style scoped>
.el-table__expanded-cell{padding: 0px;}
.el-table td > div{border: none;}
</style>

