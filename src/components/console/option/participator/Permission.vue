<template>
  <div class="option-container">
    <div class="option-head">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="head-menu">
            <span v-if="!isEdit" class="title">权限设置</span>
            <span v-else class="title">权限浏览</span>
            <router-link class="return" :to="{ path: '/option/participator' }">&lt;返回</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="option-cont">
      <el-button class="addbtn clearfix" type="success" @click="Save()" v-if="!isEdit">保存修改</el-button>
      <div class="option-list bgcolor">
        
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="formPanel">
              <div v-for="(r, rIndex) in ruleList">
                <div class="f-group form-title">{{r.ruleName}}</div>
                <form class="form-horizontal">
                  <div class="f-group" v-for="(rd, rdIndex) in r.ruleDetailedList">
                    <el-row :gutter="20">
                      <el-col :span="16"><span class="branch-title">{{rd.text}}</span></el-col>
                      <el-col :span="8"><el-switch v-model="rd.option" on-text="" off-text="" v-on:change="selectOne(rIndex, rdIndex)"></el-switch></el-col>
                    </el-row>
                  </div>
                </form>
              </div>
            </div>
          </el-col>
        </el-row>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      ruleList: [
        {
          id: '0',
          ruleName: '权益管理',
          key: 'equity',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '1-1',
              text: '权益管理',
              key: 'equity_dashboard',
              option: false,
            },
          ],
        }, {
          id: '1',
          ruleName: '期权管理',
          key: 'option',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '2-1',
              text: '期权管理',
              key: 'option_management_list',
              option: false,
            }, {
              ruleId: '2-2',
              text: '激励计划',
              key: 'option_incentive_plan',
              option: false,
            }, {
              ruleId: '2-3',
              text: '持股平台',
              key: 'option_holding_platform',
              option: false,
            }, {
              ruleId: '2-4',
              text: '参与方',
              key: 'option_participator',
              option: false,
            },
          ],
        }, {
          id: '2',
          ruleName: '文档管理',
          key: 'doc',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '3-1',
              text: '文档管理',
              key: 'doc_management_list',
              option: false,
            },
          ],
        }, {
          id: '3',
          ruleName: '账户管理',
          key: 'user',
          option: false,
          ruleDetailedList: [
            {
              ruleId: '4-1',
              text: '个人信息',
              key: 'user_personal_info',
              option: false,
            }, {
              ruleId: '4-2',
              text: '我的订单',
              key: 'user_my_order',
              option: false,
            }, {
              ruleId: '4-3',
              text: '企业列表',
              key: 'user_enterprise_list',
              option: false,
            },
          ],
        },
      ],
      licenseList: '{"equity":true,"equity_dashboard":true,"option":false,"option_management_list":false,"option_incentive_plan":false,"option_holding_platform":false,"option_participator":false,"doc":false,"doc_management_list":false,"user":false,"user_personal_info":false,"user_my_order":true,"user_enterprise_list":false}',
    };
  },
  created() {
    // const id = this.$route.params.userId;
    this.typeTest = this.$route.params.type;
    this.dataProcessing(this.licenseList);
  },
  computed: {
    isEdit() {
      if (this.typeTest.indexOf('edit') === -1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    Save() {
      const data = this.getThisPageData();
      console.log(data);
    },
    getThisPageData() {
      const ruleList = this.ruleList;
      const ruleLen = ruleList.length;
      const map = {};
      const licenseList = [];
      for (let i = 0; i < ruleLen; i += 1) {
        map[ruleList[i].key] = ruleList[i].option;
        const ruleDetailedList = ruleList[i].ruleDetailedList;
        const ruleDetailedLen = ruleDetailedList.length;
        for (let j = 0; j < ruleDetailedLen; j += 1) {
          map[ruleDetailedList[j].key] = ruleDetailedList[j].option;
        }
      }
      licenseList.push(JSON.stringify(map));
      return licenseList.toString();
    },
    selectOne(rIndex) {
      const s = new RegExp('false', 'gi');
      const ruleDetailedList = this.ruleList[rIndex].ruleDetailedList;
      const ruleDetailedListJson = JSON.stringify(ruleDetailedList);
      const tureList = ruleDetailedListJson.match(s);
      if (!tureList) {
        this.ruleList[rIndex].option = true;
      } else {
        this.ruleList[rIndex].option = false;
      }
    },
    // 此处待完善
    dataProcessing(licenseList) {
      const datalist = JSON.parse(licenseList);
      this.ruleList[0].option = datalist.equity;
      this.ruleList[0].ruleDetailedList[0].option = datalist.equity_dashboard;
      this.ruleList[1].option = datalist.option;
      this.ruleList[1].ruleDetailedList[0].option = datalist.option_management_list;
      this.ruleList[1].ruleDetailedList[1].option = datalist.option_incentive_plan;
      this.ruleList[1].ruleDetailedList[2].option = datalist.option_holding_platform;
      this.ruleList[1].ruleDetailedList[3].option = datalist.option_participator;
      this.ruleList[2].option = datalist.doc;
      this.ruleList[2].ruleDetailedList[0].option = datalist.doc_management_list;
      this.ruleList[3].option = datalist.user;
      this.ruleList[3].ruleDetailedList[0].option = datalist.user_personal_info;
      this.ruleList[3].ruleDetailedList[1].option = datalist.user_my_order;
      this.ruleList[3].ruleDetailedList[2].option = datalist.user_enterprise_list;
    },
  },
};
</script>
<style scoped>
.head-menu{background: #fff;min-height: 60px;margin:-20px -20px 0;text-align: center;position: relative;}
.head-menu .title{font-weight:bold;font-size: 16px;color: #666;letter-spacing: 1.97px;line-height: 60px;}
.head-menu .return{position: absolute;top:20px;left:20px;font-size: 14px;color: #999999;letter-spacing: 1.14px;line-height: 14px;}
.option-cont{margin:20px 0 0;}
.option-list{
  padding:50px 0 150px 30px;
  margin: 0 auto;
}
.addbtn{
  float: right;
  margin-right: 30px;
  margin-top: 20px;
}
.formPanel{
  margin: auto;
  width: 35%;
}
.f-group{
  padding: 5px;
  display: block;
}
.form-title{
  font-size: 16px;
  color: #666666;
  letter-spacing: 0.8px;
  line-height: 30px;
  /*height: 24px;*/
  position: relative;
}
.form-title::after{
  content: '';
  position: absolute;
  width: 3px;
  height: 15px;
  background-color: #696969 ;
  top:13px;
  left: -3px;
}
.branch-title{
  font-size: 14px;
  color: #999999;
  letter-spacing: 0.69px;
  height: 36px;
  display: block;
}
</style>