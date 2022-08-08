/**
 * 用户输入内容验证类
 */

// 匹配新旧手机号不同
export const isRepeat = (oldStr, newStr) => {
  if (oldStr === newStr) return false
}

// 匹配验证码
export const isVerify = (str) => {
  const reg = /^\d{6}$/
  return reg.test(str)
}

// 是否为空
export const isEmpty = (str) => {
  return str.trim() === ''
}

// /**
//  * 匹配phone
//  */
export const isPhone = (str) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
  return reg.test(str)
}

/**
 * 匹配phone
 */
export const isMobile = (str) => {
  const reg = /^(1[3456789]\d{9})$/
  return reg.test(str)
}

/**
 * 匹配Email地址
 */
export const isEmail = (str) => {
  if (str == null || str === '') return false
  var result = str.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  if (result == null) return false
  return true
}

/**
 * 判断数值类型，包括整数和浮点数
 */
export const isNumber = (str) => {
  if (isDouble(str) || isInteger(str)) return true
  return false
}

/**
 * 判断是否为正整数(只能输入数字[0-9])
 */
export const isPositiveInteger = (str) => {
  return /(^[0-9]\d*$)/.test(str)
}

/**
 * 匹配integer
 */
export const isInteger = (str) => {
  if (str == null || str === '') return false
  var result = str.match(/^[-\+]?\d+$/)
  if (result == null) return false
  return true
}

/**
 * 匹配double或float
 */
export const isDouble = (str) => {
  if (str == null || str === '') return false
  var result = str.match(/^[-\+]?\d+(\.\d+)?$/)
  if (result == null) return false
  return true
}
/**
* 重复校验规则
*/
export const isRepeats = (str1, str2) => {
  if (str1 === '' && str2 === '') {
    // 提示消息
    console.log('重复')
  }
  const reg = str1.trim().match(/^$/)
  const reg1 = str2.trim().match(/^$/)
  const text1 = reg1.test(str1)
  const text2 = reg.test(str2)
  if (text1 === text2) {
    // 提示消息
    console.log('重复')
  } else {
    return false
  }
}

/**
 *  校验输入框数字范围
 */
export const LimitNumber = (num) => {
  // const reg = /^1[0-9]$/
  // return reg.test(num) -- 校验金额范围大于10小于9999
  return num >= 10
}
