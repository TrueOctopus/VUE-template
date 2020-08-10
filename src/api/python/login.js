/*
 * @Author: 杨旭晨
 * @Date: 2020-08-10 10:58:36
 * @Descripttion: 用户登陆api
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-10 11:06:51
 */
import request from '@/utils/request'

export default {
  /**
   * @Author: 杨旭晨
   * @Date: 2020-08-10 11:01:50
   * @LastEditors: 杨旭晨
   * @Descripttion: 用户登陆api
   * @param email String 登陆邮箱
   * @param password String 用户密码
   * @return axios
   */
  login(email, password) {
    return request({
      url: '/users/login',
      method: 'post',
      data: {
        email: email,
        password: password
      }
    })
  },
  /**
   * @Author: 杨旭晨
   * @Date: 2020-08-10 11:03:35
   * @LastEditors: 杨旭晨
   * @Descripttion: 用户注册api
   * @param email String 登陆邮箱
   * @param password String 密码
   * @param username String 用户名
   * @return {type}
   */
  register(email, password, username) {
    return request({
      url: '/users/register',
      method: 'post',
      data: {
        email,
        password,
        username
      }
    })
  }
}
