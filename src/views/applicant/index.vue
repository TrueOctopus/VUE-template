<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-22 08:51:21
 * @Descripttion: 报名管理主页面
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 20:24:48
-->
<template>
  <div class="applicant">
    <Table :applicant-list="applicantList" :loading="loading" @handleDelete="handleDelete" @handlePass="handlePass" />
  </div>
</template>
<script>
import applicantApi from '@/api/python/applicant'
import Table from './components/table'
export default {
  name: 'Applicant',
  components: {
    Table
  },
  props: {},
  data() {
    return {
      applicantList: [],  // 列表数据
      loading: false  // 是否加载状态
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表信息
    getList() {
      this.loading = true
      applicantApi.getList().then(res => {
        this.applicantList = res
        this.loading = false
      })
    },
    // 根据id删除
    delete(id) {
      applicantApi.delete(id).then(res => {
        this.$message({
          type: res.code === 1 ? 'success' : 'error',
          message: res.message
        })
        this.getList()
      })
    },
    // 点击删除按钮
    handleDelete(row) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(row.id)
      })
    },
    // 点击通过
    handlePass(message, email) {
      var loading = this.$loading({ fullscreen: true })
      applicantApi.pass(message, email).then(res => {
        this.$message({
          type: res.code === 1 ? 'success' : 'error',
          message: res.message
        })
        loading.close()
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
