<template>
  <div class="option-participator">
    <div class="option-cont">
      <div class="option-list bgcolor">
        <div class="main-title clearfix">
          <span class="title">
            <el-input placeholder="搜索姓名/邮箱/员工ID" icon="search" v-model="searchMsg.inputMsg" :on-icon-click="searchBtn"></el-input>
          </span>
          <el-button class="addbtn" type="primary" @click="dialogAddPerson = true">添加参与方</el-button>
          <el-button class="addbtn" type="info">批量导入</el-button>
        </div>
        <div class="table-wrap">
          <el-table :data="account">
            <el-table-column align="center" prop="username" label="参与方名称"></el-table-column>
            <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
            <el-table-column align="center" prop="workId" label="员工ID"></el-table-column>
            <el-table-column align="center" prop="department" label="部门"></el-table-column>
            <el-table-column align="center" prop="position" label="职位"></el-table-column>
            <el-table-column align="right" label="">
              <template scope="scope">
                <el-dropdown trigger="click" @command="handleCommand(scope)">
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
        <div class="page-con">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current_page" :page-size="10" layout="total, prev, pager, next, jumper" :total="pagination.title"></el-pagination>
        </div>
      </div>
    </div>
    <!--新增参与方弹框-->
    <el-dialog title="新增参与方" :visible.sync="dialogAddPerson" :before-close="handleClose" size="small">
      <el-form label-position='right' :model="person" :rules="rules" ref="person">
        <el-form-item label="参与方名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="person.username"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth">
          <el-select v-model="person.idType">
            <el-option
              v-for="item in id_type"
              :key='item.id'
              :label='item.text'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber" :label-width="formLabelWidth">
          <el-input v-model="person.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="person.email"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :label-width="formLabelWidth">
          <el-input v-model="person.workId"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="person.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="person.position"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addPerson()">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改信息弹框-->
    <el-dialog title="编辑参与方" :visible.sync="dialogEditPerson" size="small">
      <el-form label-position='right' :model="dialogEditData" :rules="rules" ref="dialogEditData">
        <el-form-item label="参与方名称" prop="username" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.username"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" :label-width="formLabelWidth">
          <el-select v-model="dialogEditData.idType">
            <el-option
              v-for="item in id_type"
              :key='item.id'
              :label='item.text'
              :value='item.id'>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="idNumber" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.idNumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.email"></el-input>
        </el-form-item>
        <el-form-item label="员工ID" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.workId"></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.department"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="dialogEditData.position"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editPerson()">确 认</el-button>
      </div>
    </el-dialog>
    <!---->
  </div>
</template>

<script>
import pService from '../../../service/participator';
import { ID_TYPES } from '../../../data/constants';
import validate from '../../../utils/validation';

export default {
  name: 'option-participator',
  created() {
    this.searchMsg.companyId = JSON.parse(sessionStorage.getItem('_COMPANY_KEY')).companyList.companyId;
    this.pageTag = this.$route.params.page;
    if (this.$route.params.page) {
      this.pagination.current_page = this.pageTag;
    } else {
      this.pagination.current_page = 1;
    }
    this.searchBtn(this.pagination.current_page);
  },
  data() {
    return {
      searchMsg: {
        inputMsg: undefined, // 输入框信息
      },
      dialogAddPerson: false,
      dialogEditPerson: false,
      formLabelWidth: '120px',
      account: [], // table数据展示
      dialogEditData: [], // 编辑弹出框信息
      person: {
        username: undefined, // 参与方
        idType: '0', // 证件类型
        idNumber: undefined, // 证件号
        email: undefined, // 邮箱
        workId: undefined, // 员工ID
        department: undefined, // 部门
        position: undefined, // 职位
      },
      pagination: {
        current_page: 1,
        title: undefined,
      },
      id_type: ID_TYPES,
      rules: {
        username: [
          { required: true, message: '请输入参与方名称', trigger: 'blur' },
        ],
        idNumber: [
          { required: true, validator: this.validIDCard, trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' },
        ],
      },
    };
  },
  methods: {
    // 添加
    addPerson() {
      // console.log(this.person);
      this.$refs.person.validate((valid) => {
        if (valid) {
          pService.add(this.person).then(() => {
            this.$message({ message: '添加成功', type: 'success' });
          });
        } else {
          this.$message.error('填写信息有误');
        }
      });
    },
    // 编辑
    editPerson() {
      // console.log(this.person);
      this.$refs.dialogEditData.validate((valid) => {
        if (valid) {
          pService.update(this.person).then(() => {
            this.$message({ message: '编辑成功', type: 'success' });
          });
        } else {
          this.$message.error('填写信息有误');
        }
      });
    },
    handleClose(done) {
      this.person = {};
      done();
    },
    // 分页
    handleSizeChange() {
    },
    handleCurrentChange(val) {
      this.pagination.current_page = val;
      this.searchBtn(val);
    },
    // 查询
    searchBtn(pageIndex) {
      if (!this.searchMsg.inputMsg) {
        this.searchMsg.inputMsg = undefined;
      }
      pService.findAll(this.searchMsg, pageIndex, 10).then((resp) => {
        // console.log(resp);
        this.account = resp.data;
        this.pagination.title = resp.totalElements;
      });
    },
    // 操作
    handleCommand(scope) {
      const name = event.target.id;
      const command = scope.row;
      switch (name) {
        case 'edit':
          this.dialogEditPerson = true;
          this.dialogEditData = { ...command };
          break;
        case 'permissionCheck':
          // console.log(command.id);
          this.$router.push({ name: 'OptionPermission', params: { id: command.id, type: 'check', page: this.pagination.current_page } });
          break;
        case 'permissionSet':
          this.account = command;
          this.$router.push({ name: 'OptionPermission', params: { id: command.id, type: 'edit', page: this.pagination.current_page } });
          break;
        default:
          break;
      }
    },
    // 身份证验证
    validIDCard(rule, value, callback) {
      switch (this.person.idType) {
        case '0':
          if (!validate.isIDNO(value)) {
            callback(new Error('身份证号输入格式不正确'));
          } else {
            callback();
          }
          break;
        case '1':
          if (!validate.isPassport(value)) {
            callback(new Error('护照输入格式不正确'));
          } else {
            callback();
          }
          break;
        default:
          break;
      }
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
.el-dropdown-menu {
    margin: 5px 0;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.12);
    padding: 6px 0;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100px;
    background-color: #fff;
    font-size: 12px;
}
.el-dropdown-menu__item {
    list-style: none;
    line-height: 36px;
    padding: 0 10px;
    margin: 0;
    cursor: pointer;
}
.el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #e4e8f1;
    color: #48576a;
}
.page-con {
  text-align: center;
  padding: 30px 0px;
}
</style>
