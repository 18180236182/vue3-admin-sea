import request from '@/utils/request'

/**
 * 查询所有角色
 * @param data
 * @returns {*}
 */
export const findAllRole = (data) => {
  return request({
    url: '/system/api/v1/role/findAllRole',
    method: 'get',
    params: { parameters: data }
  })
}

export const findModularByRoleId = (data) => {
  return request({
    url: '/system/api/v1/role/findModularByRoleId',
    method: 'get',
    params: { parameters: data }
  })
}
