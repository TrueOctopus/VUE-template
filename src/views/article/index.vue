<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:44:47
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 09:25:18
-->
<template>
  <div class="article">
    <Header @uploadImg="uploadImg" @uploadMd="uploadMd" />
    <Table :article-list="articleList" :loading="loading" @handleDelete="handleDelete" @handleUpdate="handleUpdate" @handleDownload="download" />
  </div>
</template>
<script>
import articleApi from '@/api/python/article'
import imgApi from '@/api/python/img'
import Table from './components/table'
import Header from './components/header'
export default {
  name: 'Article',
  components: {
    Table,
    Header
  },
  props: {},
  data() {
    return {
      articleList: [],  // 文章数据列表
      loading: false  // 表格是否处于加载状态
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    // 获取文章数据
    getList() {
      this.loading = true
      articleApi.getList().then(res => {
        this.articleList = res
        this.loading = false
      })
    },
    // 删除文章
    handleDelete(row) {
      this.$confirm('确定删除吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        articleApi.delete(row.title).then(res => {
          if (res.code === 1) {
            this.$message({
              type: 'success',
              message: res.message
            })
            this.getList()
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
      })
    },
    // 添加文章
    add(file) {
      articleApi.add(file).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 更新文章
    update(file) {
      articleApi.update(file).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    // 下载文章
    download(row) {
      articleApi.download(row.filename).then(res => {
        const blob = new Blob([res], { type: res.type })
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(blob) // 创建下载的链接
        downloadElement.href = href
        downloadElement.download = row.filename + '.md' // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放blob对象
      })
    },
    // 上传图片
    uploadImg(file) {
      imgApi.uploadImg(file.file).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
      })
    },
    // 上传md文件
    uploadMd(file) {
      articleApi.add(file.file).then(res => {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.getList()
      })
    },
    // 更新文章
    handleUpdate(file) {
      articleApi.update(file.file).then(res => {
        if (res.code === 1) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getList()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
        this.getList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
