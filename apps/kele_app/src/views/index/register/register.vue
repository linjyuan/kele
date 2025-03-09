<template>
  <div>
    <div class="kele_register_txtDiv">
      <div class="kele_register_txt">
        登录
      </div>
      <div>
        已有账号？<span style="color: #005980;" @click="router.push({ path: 'login' })">去登录</span>
      </div>
    </div>
    <div class="home-content">
      <!-- 用户名、邮箱、密码、验证码、已有账号、其他登录方式 -->
      <el-form class="registerForm" :model="registerValue" autocomplete="off" :required="true" :rules="rules"
        require-asterisk-position :label-width="100" @submit="onRegister">
        <el-form-item label="用户名" class="el-form-item-center" prop="nickName">
          <el-input type="input" style="width: 100%" v-model.trim="registerValue.nickName" placeholder="请输入用户名"
            clearable />
        </el-form-item>

        <el-form-item label="邮箱" class="el-form-item-center" prop="email">
          <el-input type="email" style="width: 100%" v-model.trim="registerValue.email" placeholder="请输入邮箱" clearable />
        </el-form-item>
        <el-form-item label="密码" class="el-form-item-center" prop="password">
          <el-input type="password" style="width: 100%" v-model.trim="registerValue.password" placeholder="请输入密码"
            show-password />
        </el-form-item>
        <el-form-item label="确认密码" class="el-form-item-center" prop="againPassword">
          <el-input type="password" style="width: 100%" v-model.trim="registerValue.againPassword" placeholder="请输入密码"
            show-password />
        </el-form-item>
        <el-form-item label="验证码" class="el-form-item-registerCode" prop="registerCode">
          <el-input type="input" v-model.trim.number.lazy="registerValue.registerCode" placeholder="请输入验证码" />
          <el-button class="el-form-item-registerCodeBtn" type="primary" plain size="default">获取验证码</el-button>
        </el-form-item>
        <div class="registerBtnDiv">
          <el-button class="registerBtn" native-type="submit" type="primary" size="large">注册</el-button>
        </div>
      </el-form>
    </div>

    <div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { reactive, readonly, getCurrentInstance } from 'vue'
import { useRouter } from "vue-router";
import { type FormRules } from "element-plus"
// const { proxy } = getCurrentInstance(); // 获取全局实例
// const axios = proxy.$axios;

const router = useRouter()
const onRegister = () => {

}


const userInfo = reactive({
  picture: 'https://cdn.pixabay.com/photo/2016/08/09/21/30/user-kuzko-859198_1280.png',
})

const rules = readonly<FormRules>({
  nickName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 10, message: '用户名必须是2-10位字符', trigger: 'blur' }
  ],
  email: [
    { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "请输入正确的邮箱", trigger: 'blur' },
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        //判断两次输入的密码是否一致
        if (value !== registerValue.againPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    }
  ],
  againPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        //判断两次输入的密码是否一致
        if (value !== registerValue.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    }
  ],
  registerCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 2, max: 6, message: '请输入正确的验证码', trigger: 'blur' }
  ],
})

const registerValue = reactive({
  nickName: "",
  email: "",
  password: "",
  againPassword: "",
  registerCode: ""
})




</script>
<style scoped lang='scss'>
.kele_register_txtDiv {
  width: 70%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  margin: 5% auto;

  .kele_register_txt {
    font-size: 2rem;
    font-family: cursive;
  }
}

.registerForm {
  // width: fit-content;
  padding-right: 10%;

  .el-form-item-center {
    margin: 20px 0;
    // width: 100%;
  }

  .el-form-item-registerCode {
    // width: 90%;

    ::v-deep .el-form-item__content {
      flex-direction: row;
      flex-wrap: nowrap;
    }
  }
}

.registerBtnDiv {
  text-align: center;

  .registerBtn {
    width: 60%;
  }
}
</style>
