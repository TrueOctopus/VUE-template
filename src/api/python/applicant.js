/*
 * @Author: 杨旭晨
 * @Date: 2020-08-22 08:53:08
 * @Descripttion: 报名相关api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 20:09:09
 */
import request from '@/utils/request'

export default {
  // 获取列表
  getList() {
    return request({
      url: '/getApplicantList',
      method: 'get'
    })
  },
  // 删除
  delete(id) {
    return request({
      url: `/deleteApplicantById/${id}`,
      method: 'get'
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-06 20:08:24
   * @LastEditors: 杨旭晨
   * @Descripttion: 通过申请
   * @param message String 评价
   * @param email String 申请者的email
   * @return axios
   */
  pass(message, email) {
    return request({
      url: '/confirmApplication',
      method: 'post',
      data: {
        message,
        email
      }
    })
  }
}
