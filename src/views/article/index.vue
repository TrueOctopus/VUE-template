<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:44:47
 * @Descripttion:
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-18 11:22:41
-->
<template>
  <div class="article">
    <Header />
    <Table :article-list="articleList" :loading="loading" @handleDelete="handleDelete" />
  </div>
</template>
<script>
import articleApi from '@/api/python/article'
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
        console.log('articleList', res)
        this.articleList = res
        this.loading = false
      })
    },
    // 删除文章
    handleDelete(row) {
      articleApi.delete(row.title).then(res => {
        console.log('delete', res)
        if (res.code === 1) {
          this.$message({
            typw: 'success',
            message: res.message
          })
          this.getList()
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
