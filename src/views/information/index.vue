<!--
 * @Author: 杨旭晨
 * @Date: 2020-09-06 20:36:46
 * @Descripttion: 报道管理
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 21:54:11
-->
<template>
  <div class="information">
    <Table :table-list="tableList" :loading="loading" @handleSelect="handleSelect" />
    <Dialog :is-open.sync="isOpen" :row="dialogRow" @getList="getList" />
  </div>
</template>
<script>
import Table from './components/table'
import informationApi from '@/api/python/information'
import Dialog from './components/dialog'
export default {
  name: 'Information',
  components: {
    Table,
    Dialog
  },
  props: {},
  data() {
    return {
      tableList: [],  // 表格数据
      isOpen: false, // 选宿舍弹窗是否开启
      dialogRow: {},  // 打开弹窗时的行数据
      loading: false  // 表格是否处于加载状态
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取数据
    getList() {
      this.loading = true
      informationApi.getList(0).then(res => {
        // console.log('res', res)
        this.tableList = res
        this.loading = false
      })
    },
    // 点击选宿舍
    handleSelect(row) {
      console.log('选宿舍', row)
      this.dialogRow = { ...row }
      this.isOpen = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
