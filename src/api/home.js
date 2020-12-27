/**
 *  首页相关请求模块
*/

import axios from 'axios'

export const getTodayOnhistory = (date) => {
  date = (date.getMonth() + 1) + '/' + date.getDate()
  console.log(date)
  return axios.post(`api/todayOnhistory/queryEvent.php?key=6bb1d7b404a69095623caf2f3582f130&date=${date}`)
}
// 出现 'Access-Control-Allow-Origin' 表示非同源请求
// 这时候需要配置代理
// vue.config.js 文件是统一配置请求代理
// 已经代理了 /api 为 'http://v.juhe.cn/ => 这里直接将其替换即可
