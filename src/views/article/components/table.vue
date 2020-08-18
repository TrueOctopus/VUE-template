<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:54:28
 * @Descripttion: 表格
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-18 11:33:14
-->
<template>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="articleList"
      row-key="stId"
      tooltip-effect="light"
    >
      <el-table-column label="文章id" prop="id" align="center" min-width="120" />
      <el-table-column label="文章类型" prop="art_type" align="center" min-width="120" />
      <el-table-column label="文章标题" prop="title" align="center" min-width="120" />
      <el-table-column label="时间" prop="timestamp" align="center" min-width="100" show-overflow-tooltip />
      <el-table-column label="操作" fixed="right" align="center" min-width="220">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-search"
            @click="handleCat(scope.row)"
          >预览</el-button>
          <!-- <el-button
            type="text"
            size="mini"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
          >下载</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >更新</el-button> -->
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
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
    articleList: {  // 表格数据
      type: Array,
      required: true
    },
    loading: {  // 加载状态
      type: Boolean,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    // 点击预览按钮
    handleCat(row) {
      this.$alert(row.body, row.title, {
        dangerouslyUseHTMLString: true,
        customClass: 'article-body'
      })
    },
    // 点击删除按钮
    handleDelete(row) {
      this.$emit('handleDelete', row)
    },
    // 点击更新按钮
    handleUpdate(row) {
      this.$emit('handleUpdate', row)
    },
    // 多选选择行时执行
    handleSelectionChange(selection, row) {
      console.log('row', row)
      var ids = selection.map(item => item.stId)
      this.$emit('update:ids', ids)
    },
    // 选择框全选时执行
    selectAll(selection) {
      this.$emit('update:ids', selection.map(item => item.gcId))
    },
    // 表格内点击新增
    handleRowAdd(row) {
      this.$emit('handleRowAdd', row)
    },
    // 翻译stStatus
    formatStStauts(row) {
      return this.stStatusDict.filter(item => item.dictValue === row.stStatus + '')[0].dictLabel
    },
    // 翻译stStartdate
    formatStStartdate(row) {
      return row.stStartdate
    },
    // 翻译stEnddate
    formatStEnddate(row) {
      return row.stEnddate
    }
  }
}
</script>
<style lang="scss" scoped></style>
<style>
.article-body /deep/ img {
  width: 100%;
}
</style>
