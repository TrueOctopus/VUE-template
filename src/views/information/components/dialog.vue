<!--
 * @Author: 杨旭晨
 * @Date: 2020-09-06 21:06:42
 * @Descripttion: 弹窗
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-09-06 21:53:52
-->
<template>
  <div class="dialog">
    <el-dialog
      title="选宿舍"
      :visible.sync="isOpen"
      width="37%"
      :before-close="close"
      @open="open"
      @close="close"
    >
      <div>
        <el-badge v-for="(item, index) in roomList" :key="index" :value="item.live_number - item.now_number" class="badge">
          <el-button class="item" @click="chooseRoom(item.name)">{{ item.name }}</el-button>
        </el-badge>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import informationApi from '@/api/python/information'
export default {
  name: 'Dialog',
  components: {},
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      roomList: []  // 宿舍数据
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹窗时显示
    open() {
      if (this.row.sex === '男') {
        informationApi.getMaleRoom().then(res => {
          this.roomList = res
        })
      } else if (this.row.ses === '女') {
        informationApi.getFemaleRoom().then(res => {
          this.roomList = res
        })
      } else {
        this.$message({
          type: 'error',
          message: '信息错误，请联系管理员'
        })
      }
    },
    // 关闭弹窗时
    close() {
      this.$emit('update:isOpen', false)
    },
    // 选择宿舍
    chooseRoom(roomName) {
      this.$confirm('确定要选择这个宿舍吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确定选择宿舍
        informationApi.chooseRoom(this.row.idcard, roomName).then(res => {
          this.$emit('getList')
          this.$message({
            type: res.code === 1 ? 'success' : 'error',
            message: res.message
          })
          this.open()
          this.$emit('update:isOpen', false)
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.badge {
  margin-top: 10px;
  margin-right: 40px;
}
.item {
  margin: 10px;
}
</style>
