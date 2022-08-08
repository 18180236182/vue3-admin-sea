import request from '@/utils/request'

/**
 *
 * 获取协助记录列表
 * @returns {*}
 */
export const getList = (current, size, data) => {
  return request({
    url: `/sbasic/api/v1/assistRecord/findAssistRecordPager/${size}/${current}`,
    method: 'get',
    params: { parameters: data }
  })
}

/**
 * 导出excel
 * @param data
 * @returns {*}
 */
export const exportList = (data) => {
  return request({
    url: '/sbasic/api/v1/assistRecord/exportAssistRecord',
    method: 'get',
    responseType: 'blob',
    params: { parameters: data }
  })
}
