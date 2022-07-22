<template>
<div class="main">
    <div class="common-layout">
      <el-container>
        <!-- -->
        <el-header class="h-header">
          <div>
            header
          </div>
        </el-header>
        <!-- -->
        <el-container>
          <!-- -->
          <el-aside width="200px" class="h-aside">
            <el-menu
              :default-active="defaultValue"
              class="el-menu-vertical-demo"
              :router="true"
            >
              <template v-for="item in menus" :key="item.id">
                <el-menu-item :index="item.id + ''" class="el-menu-item" @click="handleMenuItemClick(item)">
                  <span>{{ item.name }}</span>
                </el-menu-item>
              </template>
            </el-menu>
          </el-aside>
          <!-- -->
          <!-- -->
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- -->
        </el-container>
      </el-container>
    </div>
</div>
</template>

<script>
import { computed, ref } from 'vue'
import localCache from '@/utils/cache'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { pathMapToMenu } from '@/utils/utlis'
// import { useStore } from 'vuex'

export default {
  name: 'main',
  setup () {
    const route = useRoute()
    const menus = computed(() => localCache.getCache('userMenus'))
    const currentPath = route.path
    const menu = pathMapToMenu(menus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    // 点击切换页面
    const router = useRouter()
    const handleMenuItemClick = (item) => {
      defaultValue.value = item.id
      router.push({
        path: item.path + ''
      })
    }
    return {
      defaultValue,
      menus,
      handleMenuItemClick
    }
  }
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.el-container {
  height: 100%;
}

.common-layout{
  height: 100%;
  .h-header /deep/ {
    padding: 0;
    width: 100%;
    height: 60px;
    box-shadow:0 15px 10px -15px #000 !important;
  }

  .h-aside /deep/ {
    height: 100%;
    background-color: #2c3e50;
    .el-menu-vertical-demo {
      background-color: #2c3e50;

      border-bottom: 1px solid #000000 ;
      .el-menu-item {
        color: #fff;
      }
      .el-menu-item:hover {
        background-color: dodgerblue;
      }
      .el-menu-item.is-active {
        color: #fff !important;
        background-color: dodgerblue !important;
      }
    }
  }
}
</style>
