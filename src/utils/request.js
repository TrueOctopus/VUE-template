/*
 * @Author: 杨旭晨
 * @Date: 2020-07-24 10:40:27
 * @Descripttion:
 * @LastEditors: 杨雨衡
 * @LastEditTime: 2020-09-08 12:38:19
 */
import axios from 'axios'
import {  Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://yangxuchen.com:8080/project',
  baseURL: 'http://api.hguxgkx.com/api/v1/',
  // baseURL: 'http://192.168.50.185:5000/api/v1',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // baseURL: '/api/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 * 3600 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
