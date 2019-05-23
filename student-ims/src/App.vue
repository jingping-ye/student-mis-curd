<template>
  <div id="app">
    <el-container>
      <el-header class="header">
        <base-header></base-header>
      </el-header>
      <el-container>
        <el-aside class="nav">
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
}
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
  text-align: center;
  font-size: 18px;
  box-shadow: 0 5px 15px -10px #ccc;
  -moz-box-shadow: 0 5px 15px -10px #ccc;
  -webkit-box-shadow: 0 5px 15px -10px #ccc;
  padding-top: 20px;
  margin-bottom: 10px;
}
.container {
  -moz-box-shadow: -1px 0px 5px #ccc;
  -webkit-box-shadow: -1px 0px 5px #ccc;
  box-shadow: -1px 0px 5px #ccc;
  margin-right: 10px;
  min-height: 400px;
  margin-top: 3px;
}
</style>
