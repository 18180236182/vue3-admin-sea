<template>
  <div class="log-header">
    <div style="height: 40px">
      <el-date-picker
        v-model="day"
        :unlink-panels="true"
        end-placeholder="结束时间"
        range-separator="To"
        size="large"
        start-placeholder="开始时间"
        style="width: 347px; height: 40px; margin-right: 20px"
        type="daterange"
        @change="pickerChange"
      />
      <el-input v-model="search" placeholder="模糊搜索" style="width: 191px; height: 40px; margin-right: 20px"/>
      <el-button style="width: 80px; height: 40px" type="primary">查询</el-button>
    </div>
  </div>
  <div class="log-conter">
    <el-table :data="tableData" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
              style="width: 100%">
      <el-table-column align="center" label="操作人" prop="start">
      </el-table-column>
      <el-table-column align="center" label="登录端" prop="end"/>
      <el-table-column align="center" label="操作" prop="end1"/>
      <el-table-column align="center" label="操作时间" prop="end2"/>
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
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'log',
  setup () {
    // 表单数据
    const tableData = reactive([
      {
        start: 'zzzzzz',
        end: 'pc',
        end1: 'xxxxxx',
        end2: '2000-09-90'
      }
    ])

    // 筛选数据
    const filter = reactive({
      day: '',
      startDay: '',
      endDay: '',
      search: ''
    })

    // 筛选条件change
    const pickerChange = () => {
      console.log(filter.day)
    }

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

    return {
      tableData,
      ...toRefs(page),
      ...toRefs(filter),
      pageChange,
      pickerChange
    }
  }
}
</script>

<style lang="less" scoped>
.log-conter {
  margin-top: 30px;
}
</style>
