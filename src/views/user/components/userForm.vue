<!--
 * @Author: 杨旭晨
 * @Date: 2020-07-28 09:32:10
 * @Descripttion: 用户信息表单
 * @LastEditors: 杨旭晨
 * @LastEditTime: 2020-08-18 10:29:55
-->
<template>
  <div class="user-form">
    <el-form
      ref="form"
      :rules="rules"
      :model="data"
      label-width="80px"
      :hide-required-asterisk="true"
      :status-icon="true"
      :validate-on-rule-change="true"
    >
      <el-form-item v-if="operation === 'edit'" label="id">
        <el-input v-model="data.id" :disabled="true" clearable />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.username" clearable :disabled="operation === 'edit'" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="data.name" clearable />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-input v-model="data.sex" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.email" clearable :disabled="operation === 'edit'" />
      </el-form-item>
      <!-- <el-form-item v-if="operation === 'new'" label="密码" prop="passwordHash">
        <el-input v-model="data.passwordHash" clearable />
      </el-form-item> -->
      <el-form-item label="年级" prop="grade">
        <el-input v-model="data.grade" clearable />
      </el-form-item>
      <el-form-item label="学院" prop="college">
        <el-input v-model="data.college" clearable />
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="data.major" clearable />
      </el-form-item>
      <el-form-item label="学号" prop="student_num">
        <el-input v-model="data.student_num" clearable />
      </el-form-item>
      <el-form-item label="电话" prop="phone_num">
        <el-input v-model="data.phone_num" clearable />
      </el-form-item>
      <el-form-item label="个人介绍">
        <el-input v-model="data.about_me" type="textarea" autosize placeholder="请输入内容" />
      </el-form-item>
      <el-form-item label="上传头像 ">
        <el-upload
          class="avatar-uploader"
          action=""
          ref="uploadImg"
          :limit="1"
          list-type="picture"
          :auto-upload="false"
          :on-change="onChange"
          :show-file-list="false"
        >
          <img v-if="data.profile_photo" :src="data.profile_photo | img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import USER_CONST from "@/constant/user-const";
import UserApi from "@/api/user/user";
export default {
  name: "UserForm",
  components: {},
  props: {
    form: {
      type: Object,
      required: true,
    },
    operation: {
      type: String,
      required: true,
    },
  },
  filters: {
    img: (value) => {
      return (value.indexOf('data:image') >= 0) ? value : 'http://81.70.11.36/api/v1/gets/getImgs/' + value
    }
  },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.operation === "edit") {
          callback();
        } else {
          UserApi.checkUsername(value).then((res) => {
            console.log("res: ", res);
            if (res.code === -1) {
              callback(new Error("用户名已存在"));
            } else {
              callback();
            }
          });
        }
      }
    };
    var checkStuNum = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入学号"));
      } else {
        if (this.operation === "edit") {
          callback();
        } else {
          UserApi.checkStuNum(value).then((res) => {
            console.log("res: ", res);
            if (res.code === -1) {
              callback(new Error("学号已存在"));
            } else {
              callback();
            }
          });
        }
      }
    };
    return {
      data: {}, // 表单数据
      rules: {
        // 表单验证规则
        username: [{ validator: checkUsername, trigger: "blur" }],
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        college: [{ required: true, message: "请选择学院", trigger: "blur" }],
        className: [{ required: true, message: "请选择班级", trigger: "blur" }],
        studentNum: [{ validator: checkStuNum, trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        passwordHash: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" },
        ],
        location: [{ required: true, message: "请输入地理位置", trigger: "blur" }],
      },
      baseUrl: USER_CONST.BASEURL, // 基础url
      imageUrl: ''  // 上传头像时，头像的url或者base64
    };
  },
  created() {},
  mounted() {
    this.data = { ...this.form }; // 将form复制给data
  },
  methods: {
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:35:32
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击提交按钮
     */
    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("onSubmit", this.data);
        } else {
          return false;
        }
      });
    },
    /**
     * @Author: 杨旭晨
     * @Date: 2020-07-28 10:36:02
     * @LastEditors: 杨旭晨
     * @Descripttion: 点击取消按钮
     */
    handleClose() {
      this.$emit("handleClose");
    },
    // 选择头像之后触发
    handlePreview(file) {
      console.log(file);
    },
    onChange(file, fileList) {
      console.log('file', file);
      var reader = new FileReader() // 创建FileReader对象
      reader.readAsDataURL(file.raw) // 给FileReader对象设置数据
      var _this = this // 使用_this代替this，防止再function函数中this作用域改变，调用不到vue对象
      reader.onload = function() { // 执行FileReader的onload   
        _this.data.profile_photo = reader.result // 给this.data.profile_photo赋值   e.target.reault为图片base64
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
