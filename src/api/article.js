/**
 *  文章相关请求模块
*/
import request from '@/utils/request'
import axios from 'axios'
/**
 * 获取文章列表
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用 data 设置
    // Query 参数使用 params 设置
    // Headers 参数使用 headers 设置
    params
  })
}

export const getArticles1 = () => {
  return axios.post('api/toutiao/index?type=guonei&key=401317d04019c643a761ce27fe312788')
}
