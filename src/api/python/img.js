/*
 * @Author: 杨旭晨
 * @Date: 2020-08-21 16:27:52
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-21 16:37:13
 */
import request from '@/utils/request'

export default {
  // 上传图片
  uploadImg(file) {
    const data = new FormData()
    data.append('image', file)
    return request({
      url: '/posts/uploadImg',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
  }
}
