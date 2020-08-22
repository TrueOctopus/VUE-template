<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-22 08:56:27
 * @Descripttion: table
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 09:31:02
-->
<template>
  <div class="table">
    <el-table v-loading="loading" :data="applicantList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="id" align="center" width="60" />
      <el-table-column prop="name" label="姓名" align="center" width="120" />
      <el-table-column prop="sex" label="性别" align="center" width="60" :formatter="formatSex" />
      <el-table-column prop="email" label="邮箱" align="center" width="200" />
      <el-table-column prop="birthday" label="生日" align="center" width="120" />
      <el-table-column prop="major" label="专业" align="center" width="120" />
      <el-table-column prop="class_name" label="班级" align="center" width="120" />
      <el-table-column prop="phone_num" label="电话" align="center" width="140" />

      <el-table-column prop="qq" label="QQ" align="center" width="120" />
      <el-table-column prop="software" label="会用的软件" align="center" width="120" />
      <el-table-column prop="specialty" label="特长" align="center" width="120" />
      <el-table-column prop="cognition" label="部门认知" align="center" width="120" />
      <el-table-column prop="about_me" label="自我介绍" align="center" width="120" />

      <!-- <el-table-column prop="profile_photo" label="头像" align="center" width="120">
        <template slot-scope="scope">
          <div class="header-img" style="width: 100px;hegith: 100px;">
            <img v-if="scope.row.profil_photo" :src="scope.row.profile_photo | img" alt="头像丢了" style="width:100%;" />
            <span v-else>这个人没有头像</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <svg-icon icon-class="delete" class-name="button" @click="handleDelete(scope.$index, scope.row)" />
          </el-tooltip>
          <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <svg-icon icon-class="edit" class-name="button" @click="handleEdit(scope.$index, scope.row)" />
          </el-tooltip> -->
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
    applicantList: {  // 列表数据
      type: Array,
      required: true
    },
    loading: {  // 是否加载
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {
    // 点击删除按钮
    handleDelete(index, row) {
      this.$emit('handleDelete', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  cursor: pointer;
}
</style>
