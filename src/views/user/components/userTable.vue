<!--
 * @Author: 杨旭晨
 * @Date: 2020-07-24 12:05:51
 * @Descripttion: 用户表格
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 22:23:54
-->
<template>
  <div class="user-table">
    <el-table v-loading="listLoading" :data="userList" style="width: 100%" border stripe>
      <el-table-column prop="id" label="id" align="center" width="60" />
      <el-table-column prop="username" label="用户名" align="center" width="120" />
      <el-table-column prop="name" label="姓名" align="center" width="100" />
      <el-table-column prop="sex" label="性别" align="center" width="60" :formatter="formatSex" />
      <el-table-column prop="email" label="邮箱" align="center" width="200" />
      <el-table-column prop="grade" label="年级" align="center" width="60" />
      <el-table-column prop="college" label="学院" align="center" width="120" />
      <el-table-column prop="major" label="专业" align="center" width="120" :formatter="formatMajor" />
      <el-table-column prop="student_num" label="学号" align="center" width="120" />
      <el-table-column prop="phone_num" label="电话" align="center" width="120" />
      <el-table-column prop="about_me" label="个人介绍" align="center" width="120" />
      <el-table-column prop="confirmed" label="邮箱验证" align="center" width="80" :formatter="formatConfirmed" />
      <el-table-column prop="role_id" label="权限" align="center" width="120" :formatter="formatRoleId" />
      <el-table-column prop="profile_photo" label="头像" align="center" width="120">
        <template slot-scope="scope">
          <div class="header-img" style="width: 100px;hegith: 100px;">
            <img :src="scope.row.profile_photo | img" alt="头像丢了" width="100" height="100" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-tooltip v-if="userInfo.role_id === 5" class="item" effect="dark" content="删除" placement="top">
            <svg-icon icon-class="delete" class-name="button" @click="handleDelete(scope.$index, scope.row)" />
          </el-tooltip>
          <el-tooltip v-if="userInfo.role_id === 5" class="item" effect="dark" content="编辑" placement="top">
            <svg-icon icon-class="edit" class-name="button" @click="handleEdit(scope.$index, scope.row)" />
          </el-tooltip>
          <el-tooltip v-if="userInfo.role_id === 5" class="item" effect="dark" content="修改权限" placement="top">
            <svg-icon icon-class="role" class-name="button" @click="handleEditRole(scope.$index, scope.row)" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import USER_CONST from '@/constant/user-const'
export default {
  name: 'UserTable',
  components: {},
  filters: {
    img: function(value) {
      return `${USER_CONST.BASEURL}gets/getImgs/${value}`
    }
  },
  props: {
    userList: {  // 列表数据
      type: Array,
      required: true,
      default: () => []
    },
    listLoading: {  // 是否加载状态
      type: Boolean,
      default: false
    },
    roleData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      userInfo: this.$store.getters.userInfo
    }
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * @Author: 杨旭晨
     * @Date: 2020-08-10 10:29:13
     * @LastEditors: 杨旭晨
     * @Descripttion: 格式化性别
     * @param row Object 这一行数据
     * @return String 格式化之后的数据
     */
    formatSex(row) {
      if (row.sex === USER_CONST.MALE) {
        return '男'
      } else if (row.sex === USER_CONST.FEMALE) {
        return '女'
      } else {
        return '保密'
      }
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 09:59:17
     * @LastEditors: 杨旭晨
     * @Descripttion: 格式化邮箱验证字段
     * @param row  Object  当前行数据
     */
    formatConfirmed(row) {
      if (row.confirmed === USER_CONST.TRUE) {
        return '已验证'
      } else if (row.confirmed === USER_CONST.FALSE) {
        return '未验证'
      } else {
        return '数据错误'
      }
    },
    // 翻译专业
    formatMajor(row) {
      if (row.college === '信息工程学院') {
        return row.major
      } else {
        return '这人不是信工的'
      }
    },
    // 翻译用户权限字段
    formatRoleId(row) {
      var roleData = this.roleData.filter(item => item.value === row.role_id)
      if (roleData.length > 0) {
        return roleData[0].label
      }
      return ''
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-24 16:07:23
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击编辑按钮
     * @param index  Number  当前行下标
     * @param row  Object  当前行数据
     */
    handleEdit(index, row) {
      this.$emit('handleEdit', index, row) // 执行绑定的方法
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 11:33:38
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击删除按钮
     * @param index  Number  当前行下标
     * @param row  Object  当前行数据
     */
    handleDelete(index, row) {
      this.$emit('handleDelete', index, row)
    },
    // 点击修改权限
    handleEditRole(index, row) {
      this.$emit('handleEditRole', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.button {
  font-size: 16px;
  font-weight: bold;
  margin: 10px;
  cursor: pointer;
  &:hover {
    color: red;
  }
}
</style>
