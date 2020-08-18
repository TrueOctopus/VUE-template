<!--
 * @Author: 杨旭晨
 * @Date: 2020-08-18 11:22:07
 * @Descripttion: 头部
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-18 11:55:05
-->
<template>
  <div class="header">
    <el-form>
      <el-form-item>
        <!-- <el-upload
          class="upload-demo"
          :action="baseUrl + 'posts/uploadImg'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          access-control-request-headers:content-type
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload> -->
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
      fileList: []  // 已经上传文件的列表
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
