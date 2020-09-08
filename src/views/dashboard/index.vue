<!--
 * @Author: 杨雨衡
 * @Date: 2020-09-07 22:35:00
 * @Descripttion:
 * @LastEditors: 杨雨衡
 * @LastEditTime: 2020-09-08 17:12:35
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名称: {{ username }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      username: this.$store.getters.userInfo.name
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
