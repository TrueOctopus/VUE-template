/*
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:48:18
 * @Descripttion: 文章管理api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-21 16:52:36
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
  },
  // 根据文件名下载文档
  download(name) {
    const data = new FormData()
    data.append('name', name)
    return request({
      url: '/article/downloadArt',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob',
      data: data
    })
  },
  // 上传文章
  add(file) {
    const data = new FormData()
    data.append('article', file)
    return request({
      url: '/article/uploadArt',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  },
  // 更新文章
  update(file) {
    const data = new FormData()
    data.append('article', file)
    return request({
      url: '/article/upgradeArt',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }
}
