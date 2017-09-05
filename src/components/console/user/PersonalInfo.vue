<template>
  <div class="user-personal-info">
    <div class="edit-img">
      <img src=""/>
      <span>编辑头像</span>
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
}
.edit-img {
  width: 7.58%;
  margin-right: 6.5%;
  text-align:center;
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
</style>
