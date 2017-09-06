<template>
  <div class="user-personal-info">
    <div class="edit-img">
      <img src="../../../assets/edit-img.png"/>
      <span>编辑头像</span>
    </div>
    <div class="infos">
      <h2>基础信息</h2>
      <ul>
        <li class="nikeName">
          <span>用户昵称</span><div contentEditable="false" class="name">沙枫</div><div class="edit-btn"><i><img src="../../../assets/icon-edit.png"/></i><em>编辑</em></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-personal-info',
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
.user-personal-info {
  padding: 70px 4.2%;
  background: #fff;
  overflow: hidden;
}
.edit-img, .infos {
  float: left;
}
.edit-img {
  width: 7.58%;
  margin-right: 6.5%;
  text-align: center;
  cursor: default;
}
.edit-img img {
  width: 100%;
  height: auto;
  margin-bottom: 6px;
}
.edit-img img, .edit-img span{
  display: block;
}
.edit-img span {
  color: #546AAC;
  letter-spacing: 0.69px;
  line-height: 22px;
}
.infos {
  width: 32.7%;
}
.infos h2 {
  margin-bottom: 22px;
  font-size: 16px;
  color: #666666;
  letter-spacing: 1px;
  line-height: 24px;
}
.infos ul li{
  line-height: 22px;
  overflow: hidden;
}
.infos ul li span, .infos ul li .name, .infos ul li .edit-btn {
  line-height: 22px;
  font-size: 14px;
}
.infos ul li span, .infos ul li .name {
  float: left;
  letter-spacing: 0.69px;
}
.infos ul li span {
  margin-right: 6%;
  color: #999;
}
.infos ul li .name {
  width: 60%;
  color: #666;
}
.infos ul li .edit-btn {
  float: right;
}
.infos ul li .edit-btn em {
  color: #546AAC;
  letter-spacing: 1px;
}
.infos ul li .edit-btn em, .infos ul li .edit-btn i {
  float: right;
}
.infos ul li .edit-btn i{
  width: 12px;
  height: 12px;
  margin-right: 2%;
}
.infos ul li .edit-btn i img{
  width: 100%;
  height: 100%;
}
</style>
