import request from '@/utils/request'

/**
 * 登录
 * @returns {*}
 */
export const loginUser = (data) => {
  return request({
    url: '/system/api/v1/login/login',
    method: 'post',
    data: data
  })
}

/**
 * 修改密码
 * @param data
 * @returns {*}
 */
export const loginOut = (data) => {
  return request({
    url: '/system/api/v1/account/updateAdminPass',
    method: 'put',
    data: data
  })
}
