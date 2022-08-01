<template>
  <div class="account">
    <el-tabs stretch type="border-card">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="角色管理" name="first">
          <role></role>
        </el-tab-pane>
        <el-tab-pane label="权限管理" name="second">
          <permissions></permissions>
        </el-tab-pane>
        <el-tab-pane label="日志管理" name="log">
          <log></log>
        </el-tab-pane>
      </el-tabs>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import role from './components/role'
import permissions from './components/permissions'
import log from './components/log'

export default {
  name: 'account',
  components: {
    role,
    permissions,
    log
  },
  setup () {
    const activeName = ref('first')
    const handleClick = (tab, event) => {
      console.log(tab, event)
    }
    return {
      activeName,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-tabs__item {
  font-size: 24px;
}
</style>
