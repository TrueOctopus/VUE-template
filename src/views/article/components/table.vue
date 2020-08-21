<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 10:54:28
 * @Descripttion: 表格
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-21 17:08:26
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
      <el-table-column label="文件名" prop="filename" align="center" min-width="120" />
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
          <el-upload
            class="upload-demo"
            action="#"
            :multiple="true"
            :accept="mdType.toString()"
            :before-upload="beforeUploadMd"
            list-type="picture"
            :http-request="uploadMd"
            :show-file-list="false"
          >
            <el-button
              type="text"
              size="mini"
              icon="el-icon-edit"
            >更新</el-button>
          </el-upload>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-download"
            @click="handleDownload(scope.row)"
          >下载</el-button>
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
    return {
      mdSize: 10,
      mdType: ['.md']
    }
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
    uploadMd(row) {
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
    // 下载文档
    handleDownload(row) {
      this.$emit('handleDownload', row)
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
    },
    // 上传之前，检查文件类型和文件大小
    beforeUploadMd(file) {
      /**
       * 检查文件大小
       */
      if (file.size / 1024 / 1024 > this.mdSize) {
        this.$message({
          type: 'error',
          message: `文件大小超过${this.mdSize}M`
        })
        return false
      }
      /**
       * 检查文件类型  利用文件名的后缀名来判断文件类型
       */
      var type = file.name.split('.')[file.name.split('.').length - 1]
      if (this.mdType.indexOf('.' + type) < 0) {
        this.$message({
          type: 'error',
          message: `文件类型错误`
        })
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
<style>
.article-body /deep/ img {
  width: 100%;
}
.upload-demo {
  display: inline-block;
  margin: 0 10px;
}
</style>
