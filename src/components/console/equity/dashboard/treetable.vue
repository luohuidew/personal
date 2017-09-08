<template>
  <div>
    <el-table>
      <el-table-column :data="treeData" v-for="(column, index) in treeClomns" :label="column.text" :key="column.dataIndex">
        <template scope="scope">
          <el-button class="el-icon-caret-right"></el-button>
          <el-button class="el-icon-caret-bottom"></el-button>
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
        name: '真格基金',
        children: [
          {
            name: '某某某科技有限公司',
          }, {
            name: '某某某科技有限公司',
          },
        ],
      }, {
        name: '真格基金',
        children: [
          {
            name: '某某某科技有限公司',
          }, {
            name: '某某某科技有限公司',
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
.el-icon-caret-right{}
</style>

