<template>
  <div class="assist">
    <el-card class="box-card">
      <!--      -->
      <div class="assist-header">
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
          <el-input v-model="assistName" placeholder="协助方姓名查询" style="width: 191px; height: 40px; margin-right: 20px"/>
          <el-input v-model="requestName" placeholder="请求方姓名查询" style="width: 191px; height: 40px; margin-right: 20px"/>
          <el-button style="width: 80px; height: 40px" type="primary" @click="query()">查询</el-button>
          <el-button style="width: 80px; height: 40px" type="warning" @click="remove()">清除</el-button>

        </div>
        <el-button style="width: 80px; height: 40px" type="primary" @click="exports()">导出excel</el-button>
      </div>
      <div class="assist-center">
        <el-table :data="tableList" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
                  style="width: 100%">
          <el-table-column align="center" label="开始时间" prop="startTime" width="180"/>
          <el-table-column align="center" label="结束时间" prop="endTime" width="180"/>
          <el-table-column align="center" label="协助方账号" prop="assistAccount"/>
          <el-table-column align="center" label="协助方姓名" prop="assistName"/>
          <el-table-column align="center" label="登录端" prop="assistLoginClient"/>
          <el-table-column align="center" label="请求方账号" prop="requestAccount"/>
          <el-table-column align="center" label="请求方姓名" prop="requestName"/>
          <el-table-column align="center" label="登录端" prop="requestLoginClient"/>
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
    </el-card>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import { exportList, getList } from '@/api/assist'

export default {
  name: 'assist',
  setup () {
    // 筛选条件
    const filter = reactive({
      day: null,
      startDay: null,
      endDay: null,
      assistName: null,
      requestName: null
    })

    // 分页
    const page = reactive({
      current: 1,
      total: null,
      size: 10
    })

    const tableData = reactive({
      // 表单
      tableList: []
    })

    // 日期选择器change
    const pickerChange = () => {
      console.log(filter.day)
    }

    // 表单信息方法
    const getLists = async (data) => {
      console.log(data)
      const res = await getList(page.current, page.size, JSON.stringify(data))
      tableData.tableList = res.data.records
      page.size = res.data.size
      page.current = res.data.current
      page.total = res.data.total
      console.log(res)
    }

    // 切换页数
    const pageChange = (current) => {
      // 1. 保存页码
      page.current = current
      // 发起请求
      getLists()
    }

    // 格式化时间
    const dateFormat = (dateData) => {
      const date = new Date(dateData)
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      const time = y + '-' + m + '-' + d
      return time
    }

    // 获取表单信息
    const getAllList = () => {
      const data = {
        assistName: filter.assistName,
        requestName: filter.requestName,
        startTime: filter.startDay,
        endTime: filter.endDay
      }
      getLists(data)
    }

    // 查询按钮
    const query = () => {
      page.current = 1
      if (filter.day !== null) {
        filter.startDay = `${dateFormat(filter.day[0])} 00:00:00`
        filter.endDay = `${dateFormat(filter.day[1])} 23:59:59`
      }
      const data = {
        assistName: filter.assistName,
        requestName: filter.requestName,
        startTime: filter.startDay,
        endTime: filter.endDay
      }
      getLists(data)
    }

    // 清除按钮
    const remove = () => {
      page.current = 1
      filter.endDay = null
      filter.startDay = null
      filter.day = null
      filter.requestName = null
      filter.assistName = null
      getAllList()
    }

    // 导出
    const exports = async () => {
      if (filter.day !== null) {
        filter.startDay = `${dateFormat(filter.day[0])} 00:00:00`
        filter.endDay = `${dateFormat(filter.day[1])} 23:59:59`
      }
      const data = {
        assistName: filter.assistName,
        requestName: filter.requestName,
        startTime: filter.startDay,
        endTime: filter.endDay
      }
      const res = await exportList(data)
      const fileName = '协助记录.xlsx'// 导出文件名
      const blob = new Blob([res], { type: 'application/excel' })// 转换成二进制对象
      // 对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
      // IE10以上支持blob但是依然不支持download
      if ('download' in document.createElement('a')) {
        // 支持a标签download的浏览器
        const link = document.createElement('a') // 创建a标签
        link.download = fileName // a标签添加属性
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click() // 执行下载
        URL.revokeObjectURL(link.href) // 释放url
        document.body.removeChild(link) // 释放标签
      } else {
        // 其他浏览器
        navigator.msSaveBlob(blob, fileName)
      }
      console.log(res)
    }
    onMounted(() => {
      getAllList()
    })
    return {
      getList,
      ...toRefs(page),
      ...toRefs(filter),
      pageChange,
      ...toRefs(tableData),
      pickerChange,
      query,
      remove,
      exports
    }
  }
}
</script>

<style lang="less" scoped>
.assist-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}

.assist-center-page {
  margin-top: 30px;
}
</style>
