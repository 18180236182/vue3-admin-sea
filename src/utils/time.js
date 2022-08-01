// 处理时间函数
const complement = function (value) {
  return value < 10 ? `0${value}` : value
}
export default (date) => {
  const time = new Date(date)
  const year = time.getFullYear()
  const month = complement(time.getMonth() + 1)
  const day = complement(time.getDate())
  const hour = complement(time.getHours())
  const minute = complement(time.getMinutes())
  const second = complement(time.getSeconds())
  // const week = '星期' + '日一二三四五六'.charAt(time.getDay())
  return `${year}/${month}/${day}  ${hour}:${minute}:${second}`
}
