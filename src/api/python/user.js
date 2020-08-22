/*
 * @Author: 杨旭晨
 * @Date: 2020-08-10 10:20:45
 * @Descripttion: 用户api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 08:39:22
 */
import request from '@/utils/request'

export default {
  /**
   * @Author: 杨旭晨
   * @Date: 2020-07-28 10:16:35
   * @LastEditors: 杨旭晨
   * @Descripttion: 按条件查询用户
   */
  listAll() {
    return request({
      url: '/gets/getList',
      method: 'get'
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-07-28 10:19:09
   * @LastEditors: 杨旭晨
   * @Descripttion: 更新用户
   * @param updateUser Object(User) 要更新的用户对象
   */
  update(data) {
    return request({
      url: '/posts/uploadProfile',
      method: 'post',
      data
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-07-28 11:28:31
   * @LastEditors: 杨旭晨
   * @Descripttion: 新增用户
   * @param newUser Object 新增的用户信息
   */
  add(newUser) {
    return request({
      url: '/posts/addUser',
      method: 'post',
      data: newUser
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-07-28 11:36:22
   * @LastEditors: 杨旭晨
   * @Descripttion: 根据id删除用户
   * @param id int 要删除用户的id
   */
  delete(id) {
    return request({
      url: `/users/deleteUserById/${id}`,
      method: 'get'
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-08-22 08:39:04
   * @LastEditors: 杨旭晨
   * @Descripttion: 根据id获取用户信息
   * @param id String 用户id
   * @return axios
   */
  getById(id) {
    return request({
      url: `/gets/getById/${id}`,
      method: 'get'
    })
  }
}
