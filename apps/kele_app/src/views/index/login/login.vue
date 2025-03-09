<template>
  <div class="login_content">

    <div class="kele_login_txtDiv">
      <div class="kele_login_txt">
        登录
      </div>
      <div>
        没有账号？<span style="color: #005980;" @click="router.push({ path: 'register' })">去注册</span>
      </div>
    </div>
    <el-form class="kele_login_form" :rules='rules' :model="formValue" :label-width="100" @submit.native="onLogin">
      <el-form-item label="邮箱" label-position="right" class="el-form-item-center" prop="emailValue">
        <el-input type="input" v-model.trim="formValue.emailValue" style="width: 90%" placeholder="请输入邮箱" clearable />
      </el-form-item>
      <el-form-item label="密码" label-position="right" class="el-form-item-center" prop="passwordValue">
        <el-input type="password" v-model.trim="formValue.passwordValue" style="width: 90%" placeholder="请输入密码"
          show-password />
      </el-form-item>
      <el-form-item class="kele_login_checkValue">
        <el-checkbox v-model="formValue.checkValue" label="记住密码" />
      </el-form-item>
      <div class="kele_loginBtnDiv">
        <el-button class="kele_loginBtn" native-type="submit" type="primary" size="large">确定</el-button>
      </div>
    </el-form>


  </div>

</template>
<script setup lang='ts'>
import { reactive, readonly } from 'vue'
import { storeToRefs } from "pinia"
import { useRouter } from "vue-router";
import useUserStore from "@/stores/user"
import { type FormRules } from "element-plus"

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { login } = userStore

const router = useRouter()

const rules = readonly<FormRules>({
  emailValue: [
    { pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, message: "请输入正确的邮箱", trigger: 'blur' },
    { required: true, message: '请输入邮箱', trigger: 'blur' }
  ],
  passwordValue: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})
const formValue = reactive({
  emailValue: '',
  passwordValue: '',
  checkValue: '',
})

const onLogin = () => {
  login({ email: formValue.emailValue, password: formValue.passwordValue })
}

</script>
<style scoped lang='scss'>
.login_content {
  width: 100%;

  .kele_login_txtDiv {
    width: 70%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 5% auto;

    .kele_login_txt {
      font-size: 2rem;
      font-family: cursive;
    }
  }

  .kele_login_form {
    // margin: 10% 0 10% 0;
  }

  .kele_login_forgotPassword {
    margin-top: 5%;
    text-align: center;
  }

  .kele_loginBtnDiv {
    text-align: center;

    .kele_loginBtn {
      width: 60%;
    }
  }

  .el-form-item__content {
    flex: none;
  }

  .kele_login_checkValue {
    ::v-deep .el-form-item__content {
      margin-left: 0 !important;
      justify-content: center;
    }
  }
}
</style>
