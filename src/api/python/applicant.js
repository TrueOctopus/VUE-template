/*
 * @Author: 杨旭晨
 * @Date: 2020-08-22 08:53:08
 * @Descripttion: 报名相关api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 09:18:07
 */
import request from '@/utils/request'

export default {
  getList() {
    return request({
      url: '/getApplicantList',
      method: 'get'
    })
  },
  delete(id) {
    return request({
      url: `/deleteApplicantById/${id}`,
      method: 'get'
    })
  }
}
