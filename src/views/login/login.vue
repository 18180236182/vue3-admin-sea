<template>
<div class="login">
  <el-form ref="formRef" :model="account" :rules="rules" label-width="60px">
    <el-form-item label="账号" prop="name">
      <el-input v-model="account.name"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="account.password"/>
    </el-form-item>
  </el-form>
  <el-button  @click="handleLoginClick">登录</el-button>
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
          message: '用户名是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5~10个字母或者数字~',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名必须是3位以上的字母或者数字~',
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

          Store.dispatch('login/accountLoginAction')
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

<style scoped>

</style>
