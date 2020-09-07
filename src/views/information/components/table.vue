<!--
 * @Author: 杨旭晨
 * @Date: 2020-09-06 20:39:28
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-07 22:17:44
-->
<template>
  <div class="table">
    <el-table v-loading="loading" :data="tableList">
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="身份证号" prop="idcard" />
      <el-table-column label="详细地址" prop="detailed_address">
        <template slot-scope="scope">
          <span>{{ scope.row.address + scope.row.detailed_address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="考生号" prop="candidate_number" />
      <el-table-column label="专业" prop="professional" />
      <el-table-column label="学院" prop="collage" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="籍贯" prop="native_place" />
      <el-table-column label="出生日期" prop="birthday" />
      <el-table-column label="联系电话" prop="phone_number" />
      <el-table-column label="民族" prop="ethnic" />
      <el-table-column label="政治面貌" prop="political_landscape" />
      <el-table-column label="宿舍号" :formatter="formatRoom" prop="dormitory_id" />
      <el-table-column label="报道情况" prop="check_in" />
      <el-table-column label="QQ" prop="qq" />
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
    },
    roomList: {
      // 宿舍列表
      type: Array,
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
    },
    formatRoom(row) {
      console.log('row', row)
      return this.roomList.filter(item => item.id === row.dormitory_id)[0].name
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
