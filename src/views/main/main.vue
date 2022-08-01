<template>
  <div class="main">
    <div class="common-layout">
      <el-container>
        <!-- 头部 -->
        <el-header class="h-header">
          <div style="display: flex; justify-content: space-between">
            <div class="logo">
              <div>
                <img alt="" class="img-1" src="@/assets/logo@2x.png">
                <img alt="" class="img-2" src="@/assets/远程协助后台@2x.png">
              </div>
              <div class="logo-txt">v1.0</div>
            </div>
            <div class="user-information">
              <span>{{ date }}</span>
              <el-avatar :size="45" :src="circleUrl" style="margin-right: 10px"/>
              <div class="name">{{ name }}</div>
              <div class="user-information-name">
                <!--  姓名下拉菜单  -->
                <el-dropdown trigger="click">
                 <span class="el-dropdown-link">
                     <img alt="" src="../../assets/a.png">
                 </span>
                  <template #dropdown>
                    <el-dropdown-menu style="width: 160px; height: 100px">
                      <el-dropdown-item style="height: 40px; display: flex; justify-content: center"
                                        @click="ModifyPassword()">
                        <img alt="" src="../../assets/mima_icon@2x.png" style="margin-right: 5px">
                        <span>修改密码</span>
                      </el-dropdown-item>
                      <el-dropdown-item style="height: 40px; display: flex; justify-content: center" @click="logout()">
                        <img alt="" src="../../assets/tuichu_icon@2x.png" style="margin-right: 5px">
                        <span>退出系统</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-header>
        <!-- 头部 -->
        <el-container>
          <!-- 菜单 -->
          <el-aside class="h-aside" width="200px">
            <el-menu
              :default-active="defaultValue"
              :router="true"
              class="el-menu-vertical-demo"
            >
              <!--              <template v-for="item in menus" :key="item.id">-->
              <el-menu-item :index="menus[0].id + ''" class="el-menu-item" @click="handleMenuItemClick(menus[0])">
                <!--                <img src="../../assets/xiezhujilu_icon@2x.png"-->
                <!--                     style="width: 28px; height: 28px; margin-right: 10px"/>-->
                <img src="../../assets/xiezhujilu_1_icon@2x.png"
                     style="width: 28px; height: 28px; margin-right: 10px"/>
                <span>{{ menus[0].name }}</span>
              </el-menu-item>
              <el-menu-item :index="menus[1].id + ''" class="el-menu-item" @click="handleMenuItemClick(menus[1])">
                <!--                <img src="../../assets/zhanghaoguanli_icon@2x.png"-->
                <!--                     style="width: 28px; height: 28px; margin-right: 10px"/>-->
                <img src="../../assets/zhanghaoguanli_1_icon@2x.png"
                     style="width: 28px; height: 28px; margin-right: 10px"/>
                <span>{{ menus[1].name }}</span>
              </el-menu-item>
              <el-menu-item :index="menus[2].id + ''" class="el-menu-item" @click="handleMenuItemClick(menus[2])">
                <!--                <img src="../../assets/xitngguanli_icon@2x.png"-->
                <!--                     style="width: 28px; height: 28px; margin-right: 10px"/>-->
                <img src="../../assets/xitngguanli_1_icon@2x.png"
                     style="width: 28px; height: 28px; margin-right: 10px"/>
                <span>{{ menus[2].name }}</span>
              </el-menu-item>
              <!--              </template>-->
            </el-menu>
          </el-aside>
          <!-- 菜单 -->
          <!-- 内容 -->
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- 内容 -->
        </el-container>
      </el-container>
    </div>

    <!--  修改密码弹层  -->
    <password v-model:dialog-visible="dialogVisible"></password>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import localCache from '@/utils/cache'
import formatter from '@/utils/time'
import { useRoute, useRouter } from 'vue-router/dist/vue-router'
import { pathMapToMenu } from '@/utils/utlis'
import { useStore } from 'vuex'
import password from '@/views/main/components/password'

export default {
  name: 'main',
  components: {
    password
  },
  setup () {
    // 修改密码弹窗
    const dialogVisible = ref(false)
    // 修改密码按钮
    const ModifyPassword = () => {
      console.log('xxxxxx')
      dialogVisible.value = true
    }
    const store = useStore()
    // 姓名
    const name = computed(() => store.state.login.userInfo.findPersonModel.fullName)
    // 顶部数据
    const state = reactive({
      // 头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    })
    // 路由
    const route = useRoute()
    // 用户拥有路由
    const menus = computed(() => localCache.getCache('userMenus'))
    // 当前点击所选中的路由
    const currentPath = route.path
    // 筛选角色拥有的路由
    const menu = pathMapToMenu(menus.value, currentPath)
    // 点击菜单样式切换
    const defaultValue = ref(menu.id + '')
    // 点击切换页面
    const router = useRouter()
    const handleMenuItemClick = (item) => {
      console.log(item)
      defaultValue.value = item.id
      router.push({
        path: item.path + ''
      })
    }

    // 当前时间
    const date = ref('')
    onMounted(() => {
      setInterval(() => {
        getDate()
      }, 1000)
    })
    const getDate = function () {
      date.value = formatter(new Date())
    }

    // 退出登录
    const logout = () => {
      // todo
    }

    return {
      name,
      ModifyPassword,
      dialogVisible,
      ...toRefs(state),
      date,
      defaultValue,
      menus,
      logout,
      handleMenuItemClick
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}

.el-container {
  height: 100%;
}

.common-layout {
  height: 100%;

  .h-header /deep/ {
    padding: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 15px 10px -15px #d6d6d6 !important;

    .logo {
      display: flex;

      .img-1 {
        margin-left: 10px;
        width: 60px;
        height: 60px;
      }

      .img-2 {
        padding-bottom: 10px;
        width: 193px;
        height: 32px;
      }

      .logo-txt {
        margin-left: 10px;
        margin-top: 30px;
        color: #D9DADF;
      }
    }

    .user-information {
      display: flex;
      align-items: center;
      height: 60px;

      .name {
        font-size: 18px;
        color: #6875B5;
        margin-right: 30px;
      }

      .user-information-name {
        margin-top: 5px;
      }

      span {
        margin-right: 30px;
      }
    }
  }

  .el-aside {
    background-color: #2c3e50;
  }

  .el-menu {
    border-right: 0px;
  }

  .h-aside {
    .el-menu-vertical-demo {
      background-color: #2c3e50;

      .el-menu-item {
        color: #fff;
      }

      .el-menu-item:hover {
        background-color: dodgerblue;
        color: #ffffff;
      }

      .el-menu-item.is-active {
        color: #fff !important;
        background-color: dodgerblue !important;
      }
    }
  }
}
</style>
