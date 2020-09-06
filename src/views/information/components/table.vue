<!--
 * @Author: 杨旭晨
 * @Date: 2020-09-06 20:39:28
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 21:52:59
-->
<template>
  <div class="table">
    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="id" prop="id" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="身份证号" prop="idcard" />
      <el-table-column label="地址" prop="address" />
      <el-table-column label="详细地址" prop="detailed_address" />
      <el-table-column label="考生号" prop="candidate_number" />
      <el-table-column label="学制" prop="eductional_systme" />
      <el-table-column label="学年" prop="academic_year" />
      <el-table-column label="学号" prop="student_number" />
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="scope.row.dormitory_id === null" size="mini" type="primary" @click="handleSelect(scope.row)">选宿舍</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Table',
  components: {},
  props: {
    tableList: {
      // 表格数据
      type: Array,
      required: true
    },
    loading: {
      // 表格是否处于加载状态
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {
    // 点击选宿舍
    handleSelect(row) {
      this.$emit('handleSelect', row)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
