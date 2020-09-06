/*
 * @Author: 杨旭晨
 * @Date: 2020-07-24 11:56:27
 * @Descripttion: 用户类型常量
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 19:22:21
 */

// 邮箱验证
const TRUE = true // 已验证
const FALSE = false // 未验证

// 头像前缀
const BASEURL = 'http://81.70.11.36/api/v1/'

// 性别
const MALE = 1
const FEMALE = 0

// 权限
const TOURST = {
  value: 1,
  label: '游客',
  name: 'Tourst'
}
const UNAUTHENTICATEDUSER = {
  value: 2,
  label: '未验证用户',
  name: 'UnauthenticatedUser'
}
const NORMALUSER = {
  value: 3,
  label: '普通用户',
  name: 'NormalUser'
}
const KXMEMBER = {
  value: 4,
  label: '科协成员',
  name: 'KXMember'
}
const ADMINISTRATOR = {
  value: 5,
  label: '管理员',
  name: 'Administrator'
}

export default {
  TRUE,
  FALSE,
  MALE,
  FEMALE,
  BASEURL,
  TOURST,
  UNAUTHENTICATEDUSER,
  NORMALUSER,
  KXMEMBER,
  ADMINISTRATOR
}
