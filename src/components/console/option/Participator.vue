<template>
  <div class="option-participator">
    <div class="option-cont">
      <div class="option-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">
            <el-input placeholder="搜索姓名/邮箱/员工ID" icon="search"></el-input>
          </span>
          <el-button class="addbtn" type="primary" @click="dialogAddPerson = true">添加参与方</el-button>
          <el-button class="addbtn" type="info">批量导入</el-button>
        </div>
        <div class="table-wrap">
          <el-table>
            <el-table-column label="参与方名称"></el-table-column>
            <el-table-column label="邮箱"></el-table-column>
            <el-table-column label="员工ID"></el-table-column>
            <el-table-column label="部门"></el-table-column>
            <el-table-column label="职位"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-dropdown @command="handleCommand(scope)">
                  <el-button size="mini" class="el-dropdown-link">
                    操作<i class="el-icon-caret-bottom el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item id="edit">编辑</el-dropdown-item>
                    <el-dropdown-item id="permissionCheck">权限浏览</el-dropdown-item>
                    <el-dropdown-item id="permissionSet">权限设置</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!---->
    <el-dialog title="新增参与方" :visible.sync="dialogAddPerson" size="small" :before-close="handleClose">
      <el-form :label-position='right'>
        <el-form-item label="参与方名称" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth">
          <el-select>
            <el-option value="0">身份证</el-option>
            <el-option value="1">护照</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogAddPerson = false">确 定</el-button>
      </div>
    </el-dialog>
    <!---->
  </div>
</template>

<script>
export default {
  name: 'option-participator',
  data() {
    return {
      dialogAddPerson: false,
      formLabelWidth: '120px',
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认新增参与方？').then(() => {
        done();
      }).catch(() => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.option-cont{margin:20px 0 0;}
.option-list{min-height:500px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing:1px;font-weight:bold;line-height:36px;}
.main-title .addbtn{float:right;display: inline;font-size: 14px;color: #FFFFFF;letter-spacing: 1px;margin: 0 5px;border-radius: 2px;}
.table-wrap{margin:20px 0 0;}
</style>
