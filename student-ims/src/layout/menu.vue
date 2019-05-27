<template>
  <el-menu :default-active="activeIndex"
    @select="handleSelect"
    class="menu">
    <el-menu-item index="1">班级信息</el-menu-item>
    <el-menu-item index="2">学生信息</el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      if (parseInt(key) === 1) {
        this.$router.push({
          name: 'ClassManagement'
        });
      } else {
        this.$router.push({
          name: 'StuManagement'
        });
      }
    }
  }
};
</script>
<style scoped>
.el-menu {
  border: none;
  width: 200px;
  -moz-box-shadow: -1px 0px 5px #ccc;
  -webkit-box-shadow: -1px 0px 5px #ccc;
  box-shadow: -1px 0px 5px #ccc;
  margin: 0 auto;
  margin-top: 3px;
}
</style>
