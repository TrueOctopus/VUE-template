/*
 * @Author: 杨旭晨
 * @Date: 2020-07-29 08:47:55
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-10 15:25:25
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userInfo: state => state.user.userInfo
}
export default getters
