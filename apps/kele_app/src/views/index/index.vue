<template>
  <div class="index-container">
    <div class="index_container_layout">
      <el-row :gutter="10">
        <el-col :xs="0" :sm="0" :md="12">
          <div></div>
        </el-col>
        <el-col class="kele_contain_right" :xs="24" :sm="24" :md="12">
          <font-view class="index_fontView" :txtconfig="fontViewProps.txtconfig" />
          <router-view />
          <div class="kele_index_link">
            <div class="kele_index_forgotPassword">
              已有账号，<span style="color: #005980;">忘记密码</span>
            </div>
            <el-divider class="kele_index_divider">
              其他登录方式
            </el-divider>
            <div class="kele_index_linkExternal">
              <Extennal :extennalList="extennalList" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { readonly } from "vue"
import useUserStore from "@/stores/user"
import { storeToRefs } from "pinia"
import { Extennal, type IconEnum, type FontViewProps } from "@/components"

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { setUserInfo, clearUser, login } = userStore
// console.log({ userInfo, setUserInfo, clearUser, login });

const extennalList = [
  {
    name: '',
    desc: '',
    icon: 'weixin',
    click: () => {
    },
  }
]
const fontViewProps: FontViewProps = {
  txtconfig: [
    {
      txt: "可",
      size: 30,
      backgroundColor: "rgb(45, 190, 250)",
      color: "#fff"
    },
    {
      txt: "乐",
      wrap: true,
      size: 30,
      transform: "rotate(45deg)",
      backgroundColor: "rgb(45, 190, 250)",
      color: "#fff"
    },
    {
      txt: "社区",
      size: 30,
      // backgroundColor: "rgb(45, 190, 250)",
    }
  ],
}

</script>
<style scoped lang='scss'>
.index-container {
  height: 100%;
  width: 100%;

  .index_fontView {
    width: fit-content;
    margin: auto;
  }

  .index_container_layout {
    .kele_contain_right {
      padding: 5% 0 10% 0;
      height: 100%;
      box-sizing: border-box;

      .kele_index_link {
        .kele_index_forgotPassword {
          margin-top: 5%;
          margin-bottom: 5%;
          width: 100%;
          text-align: center;
        }

        .kele_index_divider {
          width: 80%;
          margin-left: auto;
          margin-right: auto;
        }

        .kele_index_linkExternal {
          &>.menu {
            display: flex;
            justify-content: center;
          }
        }
      }
    }


  }

}
</style>
