<template>
  <div id="app">
    <el-container>
      <Header></Header>
      <el-main>
        <el-row>
          <el-col :span="6">
            <Sidebar></Sidebar>
          </el-col>
          <el-col :span="18">
            <Main></Main>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import Header from './components/Header'
import Main from './components/Main'
import Sidebar from './components/Sidebar'

export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  components: {
    Header, Main, Sidebar
  },
  methods: {
  }
}
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
