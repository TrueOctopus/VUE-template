<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 11:22:07
 * @Descripttion: 头部
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-21 16:43:44
-->
<template>
  <div class="header">
    <el-form>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :multiple="true"
          :accept="fileType.toString()"
          :before-upload="beforeUpload"
          :file-list="fileList"
          list-type="picture"
          :http-request="uploadImg"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">上传图片，只能上传jpg,png,jpeg,gif,raw,tiff文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :multiple="true"
          :accept="mdType.toString()"
          :before-upload="beforeUploadMd"
          :file-list="fileList"
          list-type="picture"
          :http-request="uploadMd"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">上传文章，只能上传md文件</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import USER_CONST from '@/constant/user-const'
export default {
  name: 'Header',
  components: {},
  props: {},
  data() {
    return {
      baseUrl: USER_CONST.BASEURL,  // 基本路径
      fileList: [],  // 已经上传文件的列表
      fileSize: 5,  // 上传文件大小
      fileType: ['.jpg', '.png', '.jepg', '.gif', '.raw', 'tiff'],
      mdSize: 10,
      mdType: ['.md']
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    // 上传图片
    uploadImg(file) {
      this.$emit('uploadImg', file)
    },
    // 上传之前，检查文件类型和文件大小
    beforeUpload(file) {
      /**
       * 检查文件大小
       */
      if (file.size / 1024 / 1024 > this.fileSize) {
        this.$message({
          type: 'error',
          message: `文件大小超过${this.fileSize}M`
        })
        return false
      }
      /**
       * 检查文件类型  利用文件名的后缀名来判断文件类型
       */
      var type = file.name.split('.')[file.name.split('.').length - 1]
      if (this.fileType.indexOf('.' + type) < 0) {
        this.$message({
          type: 'error',
          message: `文件类型错误`
        })
        return false
      }
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
    },
    // 上传md文件
    uploadMd(file) {
      this.$emit('uploadMd', file)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
