<template>
  <div class="account">
    <el-tabs stretch type="border-card">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <user></user>
        </el-tab-pane>
        <el-tab-pane label="员工管理" name="second">
          <staff></staff>
        </el-tab-pane>
      </el-tabs>
    </el-tabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import user from './components/user'
import staff from './components/staff'

export default {
  name: 'account',
  components: {
    user,
    staff
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
