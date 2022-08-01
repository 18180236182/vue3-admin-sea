<template>
  <el-dialog
    v-model="dialogShow"
    :before-close="handleClose"
    title="修改密码"
    width="30%"
  >
    <div>
      <el-form
        ref="formRef"
        :model="formLabelAlign"
        :rules="rules"
        label-position="top"
        label-width="100px"
      >
        <el-form-item label="原密码">
          <el-input v-model="formLabelAlign.oldPassWord" disabled placeholder="请输入原密码" style="height: 50px"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassWord">
          <el-input v-model="formLabelAlign.newPassWord" placeholder="请输入6-12位非特殊字符" style="height: 50px"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassWordTo">
          <el-input v-model="formLabelAlign.newPassWordTo" placeholder="请确定新密码" style="height: 50px"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="btnOk()">确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessageBox } from 'element-plus'
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
// import { loginOut } from '@/api/login'

export default {
  name: 'password',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const Store = useStore()
    // 表单数据
    const formLabelAlign = reactive({
      oldPassWord: '123456',
      newPassWord: '',
      newPassWordTo: ''
    })
    // 两次密码一致
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
      } else if (value !== formLabelAlign.newPassWord) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // 表单校验
    const rules = reactive({
      newPassWord: [
        {
          required: true,
          min: 6,
          max: 12,
          message: '密码必须是6到12位的字母或者数字',
          trigger: 'change'
        }
      ],
      newPassWordTo: [
        {
          required: true,
          validator: validatePass2,
          trigger: 'change'
        }
      ]
    })
    // 弹层显示
    const dialogShow = computed({
      get: () => props.dialogVisible,
      set: val => emit('update:dialogVisible', val)
    })

    // 表单实例
    const formRef = ref()
    // 关闭按钮
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭弹窗?')
        .then(() => {
          formRef.value.resetFields()
          dialogShow.value = false
        })
        .catch(() => {
          // catch error
        })
    }

    // 修改密码携带参数 用户id
    // const Id = computed(() => Store.state.login.userInfo.findPersonModel.adminId)
    // const Name = computed(() => Store.state.login.userInfo.findPersonModel.adminName)
    // 确定按钮
    const btnOk = () => {
      formRef.value.validate(async (valid) => {
        if (valid) {
          const data = {
            adminId: Store.state.login.userInfo.findPersonModel.adminId,
            adminName: Store.state.login.userInfo.findPersonModel.adminName,
            adminPass: formLabelAlign.newPassWordTo
          }
          console.log(data)
          // const res = await loginOut(JSON.stringify(data))
          // console.log(res)
          // todo 修改成功弹层
          dialogShow.value = false
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    return {
      formRef,
      rules,
      formLabelAlign,
      btnOk,
      dialogShow,
      handleClose
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__body {
  padding: 60px !important;
}
</style>
