<!--
 * @Author: 杨旭晨
 * @Date: 2020-09-06 20:36:46
 * @Descripttion: 报道管理
 * @LastEditors: 杨雨衡
 * @LastEditTime: 2020-09-08 16:22:05
-->
<template>
  <div class="information">
    <el-form :model="queryParams" inline>
      <el-form-item label="报道状态">
        <el-select v-model="queryParams.flag" placeholder="请选择状态">
          <el-option label="全部" value="0"></el-option>
          <el-option label="已报到" value="1"></el-option>
          <el-option label="未报到" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">搜索</el-button>
        <div style="float:right;color:red">注意：王昕哲由于是特制大床房，需要安排宿舍在6-106</div>
      </el-form-item>
    </el-form>
    <Table :table-list="tableList" :loading="loading" :room-list="roomList" @handleSelect="handleSelect" />
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
      loading: false,  // 表格是否处于加载状态
      queryParams: {
        flag: '0'
      },  // 筛选条件,
      roomList: []  // 宿舍列表
    }
  },
  created() {},
  mounted() {
    this.getList()
    this.getRoomList()
  },
  methods: {
    // 获取宿舍列表
    getRoomList() {
      informationApi.getRoomList().then(res => {
        this.roomList = res
      })
    },
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
    },
    // 点击搜索
    onSubmit() {
      this.loading = false
      informationApi.getList(Number(this.queryParams.flag)).then(res => {
        this.tableList = res
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
