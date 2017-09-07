<template>
  <div class="option-management-list">
    <div class="main-container">
      <el-row :gutter="20" class="container">
        <el-col :span="16">
          <div class="main-content bgcolor">
            <div class="main-title clearfix">
              <span class="title">正在签字的期权</span>
              <span class="titleNum">(共40,000股)</span>
              <a href="/console#/option/managementList/ManagerialOptionList" class="more">管理期权&gt;</a>
            </div>
            <div class="main-wrap">
              <el-table :data="tableData">
                <el-table-column label="编号"></el-table-column>
                <el-table-column label="被授予人"></el-table-column>
                <el-table-column label="状态"></el-table-column>
                <el-table-column label="数量（股）"></el-table-column>
                <el-table-column label="类型"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="main-content bgcolor">
            <div class="main-title clearfix">
              <span class="title">期权池</span>
              <span class="titleNum">(共14,000,000元注册资本，占总股份15.0000%)</span>
            </div>
            <div class="main-wrap">
              <div class="colorTip">
                <el-row type="flex" class="row-bg" justify="space-around">
                  <el-col :span="8">
                    <div class="grid-content">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="6" class="lump darkPurple_bg"></el-col>
                        <el-col :span="18">
                          <ul>
                            <li>剩余期权</li>
                            <li>10,500,000股</li>
                          </ul>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="6" class="lump yellow_bg"></el-col>
                        <el-col :span="18">
                          <ul>
                            <li>可行权期权</li>
                            <li>2,500,000股</li>
                          </ul>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content">
                      <el-row type="flex" justify="space-around">
                        <el-col :span="6" class="lump lightPurple_bg"></el-col>
                        <el-col :span="18">
                          <ul>
                            <li>授予但未行权期权</li>
                            <li>1,500,000股</li>
                          </ul>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="pieChart">
                饼状图
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'option-management-list',
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-content{min-height:560px;padding:30px 30px 0 30px;}
.main-title .title{float:left;display: inline;font-size: 16px;color: #666666;letter-spacing: 0.8px;font-weight:bold;}
.main-title .titleNum{display: inline; padding-left: 10px; font-size: 14px; color: #999999; letter-spacing: 0.8px; line-height: 24px; font-weight: bold;}
.main-title .more{float:right;display: inline;font-size: 14px;color: #4F6BBF;letter-spacing: 0.7px;font-weight:bold;}
.main-wrap{margin:20px 0 0;}
.lump{
  width: 20px;
  height: 14px;
  margin-top: 4px;
}
.grid-content ul li{
  line-height: 26px;
  letter-spacing: 0.7px;
  color: #575757;
}
.pieChart{
  width: 300px;
  height: 300px;
  border: 1px solid #4F6BBF;
  border-radius: 50%;
  margin: 50px auto;
}
</style>
