/*
 * @Author: 杨旭晨
 * @Date: 2020-09-06 20:41:28
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-07 22:13:14
 */
import request from '@/utils/request'

export default {
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-06 21:11:44
   * @LastEditors: 杨旭晨
   * @Descripttion: 获取报名信息
   * @param flag Number 0：全部，1：已报名，2：未报名
   * @return axios
   */
  getList(flag) {
    return request({
      url: '/stu/getStudentList',
      method: 'post',
      data: {
        flag
      }
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-06 21:13:13
   * @LastEditors: 杨旭晨
   * @Descripttion: 获取男生宿舍信息
   * @return axios
   */
  getMaleRoom() {
    return request({
      url: '/stu/showMaleRoom',
      method: 'get'
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-06 21:14:08
   * @LastEditors: 杨旭晨
   * @Descripttion: 获取女生宿舍信息
   * @return axios
   */
  getFemaleRoom() {
    return request({
      url: '/stu/showFemaleRoom',
      method: 'get'
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-06 21:29:09
   * @LastEditors: 杨旭晨
   * @Descripttion: 选择宿舍
   * @param dormitory_name String 宿舍名
   * @param idcard String 身份证号
   * @return {type}
   */
  chooseRoom(idcard, dormitory_name) {
    return request({
      url: '/stu/chooseRoom',
      method: 'post',
      data: {
        idcard,
        dormitory_name
      }
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-09-07 22:11:52
   * @LastEditors: 杨旭晨
   * @Descripttion: 获取宿舍id和name列表
   * @return axios
   */
  getRoomList() {
    return request({
      url: '/stu/getRoomList',
      method: 'get'
    })
  }
}
