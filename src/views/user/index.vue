<!--
 * @Author: 杨旭晨
 * @Date: 2020-07-24 10:40:27
 * @Descripttion: 用户组件
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 22:16:32
-->
<template>
  <div class="app-container">
    <HeadSerch v-model="headSerchData" @onSerch="onSerch" @handleReset="handleReset" @handleNew="handleNew" />
    <UserTable
      :user-list="userList"
      :list-loading="listLoading"
      :role-data="roleData"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @handleEditRole="handleEditRole"
    />
    <UserEditDialog :edit-user="editUserData" :is-show="isShowEditDialog" @handleClose="handleClose" @onSubmit="update" />
    <UserNewDialog :is-show="isShowNewDialog" @handleClose="handleClose" @onSubmit="insert" />
    <EditRole :is-show.sync="isShowEditRoleDialog" :role-data="roleData" :edit-role-data="editRoleData" @editRole="editRole" />
  </div>
</template>

<script>
import UserApi from '@/api/python/user.js'
import UserTable from './components/userTable'
import UserEditDialog from './components/userEditDialog'
import UserNewDialog from './components/userNewDialog'
import HeadSerch from './components/headSerch'
import EditRole from './components/editRole'
export default {
  name: 'User',
  components: {
    UserTable,
    UserEditDialog,
    HeadSerch,
    UserNewDialog,
    EditRole
    //
  },
  data() {
    return {
      userList: [], // 用户数据
      listLoading: true, // 表单是否处于加载状态
      queryUser: {}, // 查询的user对象
      isShowEditDialog: false, // 是否显示编辑弹窗
      editUserData: {}, // 编辑用户的信息
      isShowNewDialog: false, // 是否显示新增弹窗
      headSerchData: { // 头部搜索的数据
        id: '',
        username: '',
        name: '',
        college: '',
        className: '',
        studentNum: '',
        email: '',
        location: ''
      },
      roleData: [  // 用户权限信息
        {
          value: 1,
          label: '游客',
          name: 'Tourst'
        },
        {
          value: 2,
          label: '未验证用户',
          name: 'UnauthenticatedUser'
        },
        {
          value: 3,
          label: '普通用户',
          name: 'NormalUser'
        },
        {
          value: 4,
          label: '科协成员',
          name: 'KXMember'
        },
        {
          value: 5,
          label: '管理员',
          name: 'Administrator'
        }
      ],
      editRoleData: {},  // 修改权限弹窗数据
      isShowEditRoleDialog: false  // 是否显示修改权限弹窗
    }
  },
  mounted() {
    this.getUserList()
  },
  methods: {
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-27 21:19:17
     * @LastEditors: 杨旭晨
     * @Descripttion: 获取用户数据
     */
    getUserList() {
      UserApi.listAll().then(res => {
        this.userList = res
        this.listLoading = false
      })
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:00:46
     * @LastEditors: 杨旭晨
     * @Descripttion: 用户表格中，点击编辑按钮
     */
    handleEdit(index, row) {
      this.isShowEditDialog = true
      this.editUserData = { ...row }
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:07:45
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击关闭弹窗
     */
    handleClose() {
      this.isShowEditDialog = false
      this.isShowNewDialog = false
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:15:21
     * @LastEditors: 杨旭晨
     * @Descripttion: 表单中点击提交按钮
     * @param updateUser Object 表单信息
     * @return:
     */
    update(updateUser) {
      this.listLoading = true // 启动表格加载状态
      UserApi.update(updateUser).then(res => {
        if (res.code === 1) { // 更新成功
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.isShowEditDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        } else { // 更新失败
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    // 修改权限
    editRole() {
      console.log('editData', this.editRoleData)
      var roleName = this.roleData.filter(item => item.value === this.editRoleData.roleId)
      console.log('roleName', roleName)
      UserApi.changeRole(this.editRoleData.email, roleName[0].name).then(res => {
        this.$message({
          type: res.code === 1 ? 'success' : 'error',
          message: res.message
        })
        this.getUserList()
        this.isShowEditRoleDialog = false
      })
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:47:35
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击头部搜索按钮
     */
    onSerch() {
      this.listLoading = true // 启动表格加载状态
      this.queryUser = this.headSerchData
      this.getUserList()
    },
    handleReset() {
      this.headSerchData = { // 头部搜索的数据
        id: '',
        username: '',
        name: '',
        college: '',
        className: '',
        studentNum: '',
        email: '',
        location: ''
      }
      this.getUserList()
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 11:15:32
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击头部搜索中的新增按钮
     */
    handleNew() {
      this.isShowNewDialog = true
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 11:24:14
     * @LastEditors: 杨旭晨
     * @Descripttion: 新增用户
     * @param newUser Object 新增的用户信息
     */
    insert(newUser) {
      this.listLoading = true
      UserApi.add(newUser).then(res => {
        if (res.code === 1) { // 添加成功
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.isShowNewDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        } else { // 更新失败
          this.$message({
            message: res.message,
            type: 'error'
          })
          this.isShowNewDialog = false // 关闭弹窗
          this.getUserList() // 更新成功，重新获取数据
        }
      })
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 11:34:23
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击删除按钮
     * @param index  Number  当前行下标
     * @param row  Object  当前行数据
     */
    handleDelete(index, row) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        UserApi.delete(row.id).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getUserList()
        })
      })
    },
    // 修改权限
    handleEditRole(row) {
      // console.log('点击了修改权限', row.email, row.role_id)
      this.isShowEditRoleDialog = true
      this.editRoleData = { email: row.email, roleId: row.role_id }
    }
  }
}
</script>

<style lang="scss" scoped></style>
