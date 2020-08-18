/*
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:48:18
 * @Descripttion: 文章管理api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-18 11:16:15
 */
import request from '@/utils/request'

export default {
  // 获取所有文章
  getList() {
    return request({
      url: '/gets/getAllArtList',
      method: 'get'
    })
  },
  // 删除文章
  delete(title) {
    return request({
      url: '/article/deleteArt',
      method: 'post',
      data: {
        title: title
      }
    })
  }
}
