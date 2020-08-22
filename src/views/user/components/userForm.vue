<!--
 * @Author: 杨旭晨
 * @Date: 2020-07-28 09:32:10
 * @Descripttion: 用户信息表单
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-22 22:12:04
-->
<template>
  <div class="user-form">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      :hide-required-asterisk="true"
      :status-icon="true"
      :validate-on-rule-change="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="id">
            <el-input v-model="form.id" :disabled="true" clearable style="width:100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" clearable :disabled="operation === 'edit'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="姓名" prop="name">
            <el-input v-model="form.name" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别" style="width:100%">
              <el-option label="男" :value="1" />
              <el-option label="女" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" clearable :disabled="operation === 'edit'" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="年级" prop="grade">
            <el-select v-model="form.grade" placeholder="请选择年级" style="width:100%">
              <el-option v-for="(item, index) in grade_sel" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="学院" prop="college">
            <el-select v-model="form.college" placeholder="请选择学院" style="width:100%">
              <el-option v-for="(item, index) in college_sel" :key="index" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="专业" prop="major">
            <el-select v-if="form.college === '信息工程学院'" v-model="form.major" placeholder="请选择专业" style="width:100%">
              <el-option v-for="(item, index) in xinxi" :key="index" :label="item" :value="item" />
            </el-select>
            <span v-else>若想完善此信息,请转系信工吧<input v-model="form.major" type="text" hidden /></span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="学号" prop="student_num">
            <el-input v-model="form.student_num" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'edit'" label="电话" prop="phone_num">
            <el-input v-model="form.phone_num" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="operation === 'edit'" label="个人介绍">
            <el-input v-model="form.about_me" type="textarea" autosize placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="operation === 'new'" label="密码">
            <el-input v-model="form.password" type="password" autosize placeholder="请输入密码" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="operation === 'edit'" label="上传头像 ">
            <el-upload
              ref="uploadImg"
              class="avatar-uploader"
              action=""
              list-type="picture"
              :multiple="false"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :accept="fileType.toString()"
              :on-change="onChange"
              :show-file-list="false"
            >
              <img v-if="form.profile_photo" :src="form.profile_photo | img" class="avatar" width="200" height="200" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import USER_CONST from '@/constant/user-const'
import UserApi from '@/api/user/user'
export default {
  name: 'UserForm',
  components: {},
  filters: {
    img: (value) => {
      return (value.indexOf('data:image') >= 0) ? value : 'http://81.70.11.36/api/v1/gets/getImgs/' + value
    }
  },
  props: {
    form: {
      type: Object,
      required: true
    },
    operation: {
      type: String,
      required: true
    }
  },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        // if (this.operation === 'edit') {
        //   callback()
        // } else {
        //   UserApi.checkUsername(value).then((res) => {
        //     console.log('res: ', res)
        //     if (res.code === -1) {
        //       callback(new Error('用户名已存在'))
        //     } else {
        //       callback()
        //     }
        //   })
        // }
        callback()
      }
    }
    var checkStuNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'))
      } else {
        // if (this.operation === 'edit') {
        //   callback()
        // } else {
        //   UserApi.checkStuNum(value).then((res) => {
        //     console.log('res: ', res)
        //     if (res.code === -1) {
        //       callback(new Error('学号已存在'))
        //     } else {
        //       callback()
        //     }
        //   })
        // }
        callback()
      }
    }
    return {
      data: {}, // 表单数据
      rules: {
        // 表单验证规则
        username: [{ validator: checkUsername, trigger: 'blur' }],
        name: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        college: [{ required: true, message: '请选择学院', trigger: 'blur' }],
        className: [{ required: true, message: '请选择班级', trigger: 'blur' }],
        studentNum: [{ validator: checkStuNum, trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        passwordHash: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        location: [{ required: true, message: '请输入地理位置', trigger: 'blur' }]
      },
      baseUrl: USER_CONST.BASEURL, // 基础url
      imageUrl: '',  // 上传头像时，头像的url或者base64
      college_sel: ['信息工程学院', '研究生学院', '水资源与环境学院', '宝石与材料工艺学院', '经贸学院', '商学院', '法政学院', '外国语教学部', '继续教育学院', '体育部', '影视艺术学院', '资源学院', '勘查技术与工程学院', '会计学院', '管理科学与工程学院', '艺术设计系', '数理教学部', '职业技术学院', '社会科学部'],
      grade_sel: ['20级', '19级', '18级', '17级', '16级'],
      xinxi: ['计算机类', '光电信息科学与工程', '通信工程', '电子信息工程', '信息安全', '计算机科学与技术', '软件工程'], // 信息工程学院
      fileType: ['.jpg', '.png', '.jepg', '.gif', '.raw', 'tiff'],  // 上传头像类型
      fileSize: 5  // 上传头像大小
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:35:32
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击提交按钮
     */
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.form)
        } else {
          return false
        }
      })
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:36:02
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击取消按钮
     */
    handleClose() {
      this.$emit('handleClose')
    },
    // 上传之前，检查文件类型和文件大小
    beforeUpload(file) {
      /**
       * 检查文件大小
       */
      console.log('asdffile', file)
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
    // 选择头像之后触发，获取图片base64
    onChange(file, fileList) {
      /**
       * 检查文件大小
       */
      console.log('asdffile', file)
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
      // console.log('file', file)
      var reader = new FileReader() // 创建FileReader对象
      reader.readAsDataURL(file.raw) // 给FileReader对象设置数据
      var _this = this // 使用_this代替this，防止再function函数中this作用域改变，调用不到vue对象
      reader.onload = function() { // 执行FileReader的onload
        _this.form.profile_photo = reader.result // 给this.data.profile_photo赋值   e.target.reault为图片base64
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
