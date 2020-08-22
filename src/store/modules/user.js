/*
 * @Author: 杨旭晨
 * @Date: 2020-07-24 10:40:27
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 08:47:19
 */
// import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'
import { resetRouter } from '@/router'
import userApi from '@/api/python/user'

const getDefaultState = () => {
  return {
    token: getToken(),
    userId: getUserId(),
    name: '',
    avatar: '',
    userInfo: {} // 用户信息
  }
}

const state = getDefaultState()

const mutations = {
  SER_USERID: (state, data) => {
    state.userId = data
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      var user = { ...userInfo }
      commit('SET_USERINFO', user)
      commit('SET_TOKEN', user.token)
      commit('SER_USERID', user.id)
      setToken(user.token)
      setUserId(user.id)
      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      userApi.getById(state.userId).then(res => {
        var user = { ...res }
        commit('SET_USERINFO', user)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserId()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeUserId()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

