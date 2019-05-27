<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <base-header></base-header>
      </el-header>
      <el-container>
        <el-aside>
          <nav-menu>
          </nav-menu>
        </el-aside>
        <el-main class="container">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BaseHeader from '@/layout/header';
import NavMenu from '@/layout/menu';
export default {
  name: 'App',
  components: {
    BaseHeader,
    NavMenu
  }
};
</script>
<style>
@import url("./styles/reset.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  line-height: 60px;
  margin-bottom: 10px;
  box-shadow: 0 5px 15px -10px #ccc;
  -moz-box-shadow: 0 5px 15px -10px #ccc;
  -webkit-box-shadow: 0 5px 15px -10px #ccc;
}
.container {
  min-height: 400px;
  margin: 3px 10px 10px 0px;
  box-shadow: -1px 0px 5px #ccc;
  -moz-box-shadow: -1px 0px 5px #ccc;
  -webkit-box-shadow: -1px 0px 5px #ccc;
}
</style>
