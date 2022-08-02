<template>
  <div class="user-center">
    <el-table :data="tableList" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
              style="width: 100%">
      <el-table-column align="center" label="角色" prop="roleName">
      </el-table-column>
      <el-table-column align="center" label="具体描述" prop="roleName"/>
      <el-table-column align="center" label="相关权限">
        <template v-slot="{ row }">
          <el-button plain size="small" type="primary" @click="resetPassWord(row)">查看权限</el-button>
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
      <el-tree ref="treeRef"
               :data="treelist"
               :default-checked-keys="defKeys"
               :props="props"
               node-key="modularId"
               show-checkbox
               @node-click="handleNodeClick"/>
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
import { reactive, ref, onMounted, toRefs, nextTick } from 'vue'
import { ElMessageBox } from 'element-plus'
import { findAllRole, findModularByRoleId } from '@/api/system'

export default {
  name: 'role',
  setup () {
    // 权限数据
    const data = reactive({
      defKeys: [] // 树形默认选中的节点
    })

    // 树形渲染对应的值
    const props = {
      label: 'pageName',
      children: 'children',
      disabled: true
    }
    // 全部节点
    const treelist = ref([])
    // 树形实例
    const treeRef = ref()

    // 树形点击
    const handleNodeClick = (data) => {
      console.log(data)
    }

    // 弹层显示
    const dialogShow = ref(false)

    // 表单信息
    const tableData = reactive({
      tableList: []
    })

    // 关闭按钮
    const handleClose = (done) => {
      ElMessageBox.confirm('确定关闭弹窗?')
        .then(() => {
          data.defKeys = []
          dialogShow.value = false
        })
        .catch(() => {
          // catch error
        })
    }

    // 确定按钮
    const btnOk = () => {
      data.defKeys = []
      dialogShow.value = false
    }

    // 获取全部角色
    const findRoles = async () => {
      const data = {}
      const { data: res } = await findAllRole(data)
      tableData.tableList = res.authRoles
      treelist.value = res.authModulars.children
      console.log(treelist.value)
    }

    // 查看权限
    const resetPassWord = async (row) => {
      const data = {
        roleId: row.roleId
      }
      const res = await findModularByRoleId(data)
      console.log(res)
      const roleData = res.data.modularIds
      dialogShow.value = true
      // 回调才能赋值
      await nextTick(() => {
        console.log(roleData)
        const arr = []
        roleData.map(item => {
          arr.push(item.modularId)
        })
        treeRef.value.setCheckedKeys(arr, false)
      })
    }
    onMounted(() => {
      findRoles()
    })

    return {
      props,
      treelist,
      treeRef,
      ...toRefs(data),
      dialogShow,
      ...toRefs(tableData),
      handleNodeClick,
      handleClose,
      btnOk,
      resetPassWord
    }
  }
}
</script>

<style scoped>

</style>
