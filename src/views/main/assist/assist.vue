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
          <el-button style="width: 80px; height: 40px" type="primary">查询</el-button>
        </div>
        <el-button style="width: 80px; height: 40px" type="primary">导出excel</el-button>
      </div>
      <div class="assist-center">
        <el-table :data="tableData" :header-cell-style="{ background:'#eef1f6',color:'#606266' }" stripe
                  style="width: 100%">
          <el-table-column align="center" label="开始时间" prop="start" width="180"/>
          <el-table-column align="center" label="结束时间" prop="end" width="180"/>
          <el-table-column align="center" label="协助方账号" prop="assistQQ"/>
          <el-table-column align="center" label="协助方姓名" prop="assistName"/>
          <el-table-column align="center" label="登录端" prop="assistLogin"/>
          <el-table-column align="center" label="请求方账号" prop="requestQQ"/>
          <el-table-column align="center" label="请求方姓名" prop="requestName"/>
          <el-table-column align="center" label="登录端" prop="requestLogin"/>
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
import { reactive, toRefs } from 'vue'

export default {
  name: 'assist',
  setup () {
    // 筛选条件
    const filter = reactive({
      day: '',
      startDay: '',
      endDay: '',
      assistName: '',
      requestName: ''
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

    // 表单
    const tableData = [
      {
        start: '2016-05-03',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: 'pc',
        requestQQ: '1234567890',
        requestName: '李四',
        requestLogin: 'pc'
      },
      {
        start: '2016-05-03',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: 'pc',
        requestQQ: '1234567890',
        requestName: '李四',
        requestLogin: 'pc'
      },
      {
        start: '2016-05-03',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: 'pc',
        requestQQ: '1234567890',
        requestName: '李四',
        requestLogin: 'pc'
      },
      {
        start: '2016-05-03',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: 'pc',
        requestQQ: '1234567890',
        requestName: '李四',
        requestLogin: 'pc'
      },
      {
        start: '2016-05-03',
        end: '2016-05-03',
        assistQQ: '123456789',
        assistName: '张三',
        assistLogin: 'pc',
        requestQQ: '1234567890',
        requestName: '李四',
        requestLogin: 'pc'
      }
    ]

    // 日期选择器change
    const pickerChange = () => {
      console.log(filter.day)
    }
    return {
      ...toRefs(page),
      ...toRefs(filter),
      pageChange,
      tableData,
      pickerChange
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
