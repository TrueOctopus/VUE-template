/*
 * @Author: 杨旭晨
 * @Date: 2020-08-17 16:54:03
 * @Descripttion: 和token相关函数
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 08:45:30
 */
import Cookies from 'js-cookie'

const TokenKey = 'Authorization'

const UserId = 'AuthorId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(UserId)
}

export function setUserId(token) {
  return Cookies.set(UserId, token)
}

export function removeUserId() {
  return Cookies.remove(UserId)
}
