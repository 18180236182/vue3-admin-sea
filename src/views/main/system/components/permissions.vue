<template>
  <div class="user-center">
    <el-table :data="tableData" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
              style="width: 100%">
      <el-table-column align="center" label="角色" prop="start">
      </el-table-column>
      <el-table-column align="center" label="相关权限">
        <template v-slot="{ row }">
          <el-button plain size="small" type="primary" @click="resetPassWord(row)">编辑权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 弹层 -->
  <div>
    <el-dialog
      v-model="dialogShow"
      :before-close="handleClose"
      :close-on-click-modal="false"
      class="permissionDialog"
      title="查看权限"
    >
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button type="primary" @click="btnOk()">确定</el-button
        >
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'permissions',
  setup () {
    // 权限数据
    const data = reactive([
      {
        label: 'Level one 1',
        children: [
          {
            label: 'Level two 1-1',
            children: [
              {
                label: 'Level three 1-1-1'
              }
            ]
          }
        ]
      },
      {
        label: 'Level one 2',
        children: [
          {
            label: 'Level two 2-1',
            children: [
              {
                label: 'Level three 2-1-1'
              }
            ]
          },
          {
            label: 'Level two 2-2',
            children: [
              {
                label: 'Level three 2-2-1'
              }
            ]
          }
        ]
      },
      {
        label: 'Level one 3',
        children: [
          {
            label: 'Level two 3-1',
            children: [
              {
                label: 'Level three 3-1-1'
              }
            ]
          },
          {
            label: 'Level two 3-2',
            children: [
              {
                label: 'Level three 3-2-1'
              }
            ]
          }
        ]
      }
    ])
    // 树形显示
    const defaultProps = {
      children: 'children',
      label: 'label'
    }
    // 树形点击
    const handleNodeClick = (data) => {
      console.log(data)
    }
    // 弹层显示
    const dialogShow = ref(false)
    // 表单信息
    const tableData = reactive([
      {
        start: 'guanliyuan'
      }
    ])
    // 查看权限
    const resetPassWord = (row) => {
      dialogShow.value = true
      console.log(row)
    }
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
    return {
      data,
      defaultProps,
      handleNodeClick,
      dialogShow,
      tableData,
      handleClose,
      btnOk,
      resetPassWord
    }
  }
}
</script>

<style scoped>

</style>
