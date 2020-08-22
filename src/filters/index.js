/*
 * @Author: 杨旭晨
 * @Date: 2020-08-22 08:32:57
 * @Descripttion: 全局过滤器
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 08:36:55
 */
import USER_CONST from '@/constant/user-const'
export function img(value) {
  return `${USER_CONST.BASEURL}gets/getImgs/${value}`
}
