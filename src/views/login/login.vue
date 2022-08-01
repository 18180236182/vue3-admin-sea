<template>
  <div class="login">
    <div class="login-center">
      <div class="img">
        <img alt="" src="@/assets/chahua_image.png">
      </div>
      <div class="right">
        <div class="logo">
          <div class="logo-all">
            <img alt="" class="img-1" src="@/assets/logo@2x.png">
            <img alt="" class="img-2" src="@/assets/远程协助@2x.png">
          </div>
        </div>
        <div class="login-input">
          <el-form
            ref="formRef"
            :model="account"
            :rules="rules"
            class="form"
            label-position="top"
            label-width="100px"
            style="min-width: 404px"
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="account.name" size="large"/>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="account.password" size="large"/>
            </el-form-item>
          </el-form>

          <div class="checkbox">
            <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          </div>

          <div class="login-btn">
            <el-button type="primary" @click="handleLoginClick">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default {
  name: 'login',
  setup () {
    // 校验规则
    const rules = reactive({
      name: [
        {
          required: true,
          message: '请填写账号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          min: 6,
          max: 12,
          message: '密码必须是6到12位以上的字母或者数字',
          trigger: 'blur'
        }
      ]
    })
    // 表单数据
    const account = reactive({
      name: localCache.getCache('name'),
      password: localCache.getCache('password')
    })
    // 记住密码
    const isKeepPassword = ref(true)
    // 表单实例
    const formRef = ref()
    const Store = useStore()
    // 登录点击
    const handleLoginClick = (isKeepPassword) => {
      formRef.value.validate((valid) => {
        if (valid) {
          console.log('登录')
          console.log(valid)
          // 记住密码
          if (isKeepPassword) {
            // 本地缓存用户名和密码
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // todo
          // 调接口 判断用户名、密码是否正确
          //  ElMessage.error('用户名字或者密码错误或者未注册')
          const data = {
            adminName: account.name,
            adminPass: account.password,
            client: '管理端'
          }
          Store.dispatch('login/accountLoginAction', data)
        } else {
          console.log('填写错误')
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      isKeepPassword,
      handleLoginClick
    }
  }
}
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #F5F5F5;

  .login-center {
    display: flex;
    width: 1095px;
    height: 581px;
    background-color: #ffffff;
    box-shadow: #d6d6d6 0px 0px 30px 5px; //边框内阴影

    .img {
      width: 533px;
      height: 581px;
    }

    .right {
      width: 562px;
      height: 581px;

      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 110px;

        .logo-all {
          padding-top: 30px;
        }

        .img-1 {
          width: 80px;
          height: 80px;
        }

        .img-2 {
          padding-bottom: 10px;
          width: 177px;
          height: 44px;
        }
      }

      .login-input {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 471px;

        .form {
          .el-form-item__label {
            margin-top: 20px;
          }

          .el-input {
            width: 404px;
            height: 60px;
            border-radius: 10px;
            //margin-bottom: 28px;
          }

          .el-form-item__label {
            font-size: 20px;
            margin-bottom: 18px;
          }
        }

        .checkbox {
          position: fixed;
          margin-bottom: -155px;
          margin-left: 325px;
        }

        .el-button {
          margin-top: 40px;
          border-radius: 10px;
          width: 404px;
          height: 60px;
        }
      }
    }
  }
}
</style>
