<template>
  <div class="user-header">
    <div>
      <el-input v-model="search" placeholder="模糊搜索" style="width: 191px; height: 40px; margin-right: 20px"/>
      <el-button style="width: 80px; height: 40px" type="primary">查询</el-button>
    </div>
    <el-button style="width: 80px; height: 40px" type="primary" @click="addUser('add')">添加员工</el-button>
  </div>
  <div class="user-center">
    <el-table :data="tableData" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
              style="width: 100%">
      <el-table-column align="center" label="头像" prop="start">
        <template v-slot="{ row }">
          <el-avatar :size="50" :src="row.start"/>
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号" prop="end"/>
      <el-table-column align="center" label="用户名" prop="assistQQ"/>
      <el-table-column align="center" label="角色" prop="assistName"/>
      <el-table-column align="center" label="上次登录时间" prop="assistLogin"/>
      <el-table-column align="center" label="操作" width="300">
        <template v-slot="{ row }">
          <el-button plain size="small" type="primary" @click="addUser('res',row)">修改</el-button>
          <el-button plain size="small" type="primary" @click="resetPassWord(row)">重置密码</el-button>
          <el-button plain size="small" type="primary">禁用</el-button>
          <el-button plain size="small" type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="assist-center-page">
      <el-row align="middle" justify="end" style="height: 60px" type="flex">
        <el-pagination
          :current-page="current"
          :page-size="size"
          :total="total"
          background
          layout="prev, pager, next"
          @current-change="pageChange"
        />
      </el-row>
    </div>
  </div>
  <!-- 弹层  -->
  <el-dialog
    v-model="dialogShow"
    :before-close="handleClose"
    :title="isAdd ? '添加员工' : '修改员工'"
    width="30%"
  >
    <div>
      <div class="portrait">
        <!--        <template v-if="isAdd">-->
        <!--          <el-avatar :size="100" :src="formLabelAlign.circleUrl" />-->
        <!--          <div style="margin-top: 10px">个人头像</div>-->
        <!--        </template>-->
        <el-upload
          :before-upload="beforeAvatarUpload"
          :on-success="UploadSuccess"
          :show-file-list="false"
          class="avatar-uploader"
          style="display: inline-block"
        >
          <img v-if="formLabelAlign.circleUrl" :src="formLabelAlign.circleUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div style="margin-top: 10px">个人头像</div>
      </div>
      <el-form
        ref="formRef"
        :model="formLabelAlign"
        :rules="rules"
        label-position="top"
        label-width="100px"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formLabelAlign.phone"   placeholder="请输入手机号" style="height: 50px"/>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
<!--          <el-select v-model="formLabelAlign.role" clearable placeholder="全部角色" size="large"-->
<!--                     style="width: 100%; height: 40px;">-->
<!--            <el-option-->
<!--              v-for="item in roles"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--            >-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-input v-model="formLabelAlign.roles" disabled placeholder="请确定角色" style="height: 50px" />
        </el-form-item>
        <el-form-item label="用户名" prop="nickname">
          <el-input v-model="formLabelAlign.nickname" placeholder="请确定用户名" style="height: 50px" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="btnOk()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'user',
  setup () {
    // 表单
    const tableData = [
      {
        start: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: '2016-05-03'
      }
    ]

    // 筛选数据
    const filter = reactive({
      search: ''
    })

    // 分页
    const page = reactive({
      current: 1,
      total: 50,
      size: 10
    })

    // 切换页数
    const pageChange = (current) => {
      // 1. 保存页码
      console.log(current)
      // todo
      page.current = current
      // 发起请求
    }

    // 下拉角色数据
    const options = reactive([
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }
    ])

    // 重置密码
    const resetPassWord = (row) => {
      console.log(row)
    }

    const dialogShow = ref(false)
    /**
     * 弹层
     */
    // 弹层数据
    const formLabelAlign = reactive({
      phone: '',
      roles: '员工',
      nickname: '',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    })
    // 校验规则
    const rules = reactive({
      phone: [
        { required: true, message: '请输入手机号码', trigger: 'blur' },
        { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
        {
          pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
          message: '请输入正确的手机号码'
        }
      ],
      role: [
        { required: true, message: '请输入角色', trigger: 'blur' }
      ],
      nickname: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
      ]
    })
    // 弹层角色下拉数据
    const roles = reactive([
      {
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }
    ])
    // 关闭按钮
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭弹窗?')
        .then(() => {
          dialogShow.value = false
        })
        .catch(() => {
          // catch error
        })
    }
    // 确定按钮
    const btnOk = () => {
      dialogShow.value = false
    }
    // 控制添加还是修改
    const isAdd = ref(false)
    // 添加用户、修改
    const addUser = (operation, row) => {
      if (operation === 'add') {
        // 添加
        console.log('xxxx')
        isAdd.value = true
        dialogShow.value = true
      } else {
        // 修改
        console.log('aaaaa')
        console.log(row)
        isAdd.value = false
        dialogShow.value = true
      }
    }

    // 上传时判断文件类型和大小
    const beforeAvatarUpload = (file) => {
      console.log(file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

    // 上传成功
    const UploadSuccess = (file) => {
      console.log(file)
      formLabelAlign.circleUrl = URL.createObjectURL(file.raw)
    }
    return {
      ...toRefs(page),
      ...toRefs(filter),
      tableData,
      options,
      pageChange,
      resetPassWord,
      formLabelAlign,
      rules,
      roles,
      handleClose,
      btnOk,
      isAdd,
      addUser,
      beforeAvatarUpload,
      UploadSuccess,
      dialogShow
    }
  }
}
</script>

<style lang="less" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}

.user-center {
  margin-top: 30px;
}

.portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}
</style>
