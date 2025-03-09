<template>
  <div class="homeDiv">
    <div class="homeContenr">
      <el-container class="homeContainer">
        <el-aside width="200px" class="homeContenr-left">
          <div>
            <Extennal :extennalList="extennalList" />
          </div>
          <el-avatar :size="50" :src="userInfo.headImg" />
        </el-aside>

        <el-main class="homeContenr-main">
          <div>
            <ChatFrame />
          </div>
        </el-main>

        <el-aside width="200px" class="homeContenr-right">

        </el-aside>
      </el-container>
    </div>
  </div>

</template>
<script setup lang='ts'>
import { reactive } from "vue"
import { Extennal, ChatFrame, type IconEnum } from "@/components"
// import { ChatFrame } from "@/components/ChatFrame/index.ts"

const extennalList: IconEnum[] = [
  {
    name: '',
    desc: '哔哩哔哩',
    icon: 'bilibili',
    click: () => {
      window.open('https://space.bilibili.com/146719540', '_blank')
    },
  },
  {
    name: '项目文档',
    desc: '语雀',
    icon: 'yuque',
    click: () => {
      window.open('https://www.yuque.com/snab/planet/cef1mcko4fve0ur3', '_blank')
    },
  },
  {
    name: '618超优惠',
    desc: '腾讯云',
    icon: 'qcloud',
    click: () => {
      window.open('https://curl.qcloud.com/qSaH0JLT', '_blank')
    },
  },
  {
    name: '后端源码',
    desc: 'kele Server',
    icon: 'github',
    click: () => {
      window.open('https://github.com/zongzibinbin/MallChat', '_blank')
    },
  },
  {
    name: '前端源码',
    desc: 'kele Web',
    icon: 'github',
    click: () => {
      window.open('https://github.com/Evansy/MallChatWeb', '_blank')
    },
  },
]

const userInfo = reactive({
  headImg: "",
})

</script>
<style scoped lang='scss'>
.homeDiv {
  height: 100%;
  width: 100%;
  background-color: black;
  padding: 10px 10px;
  box-sizing: border-box;

  .homeContenr {
    height: 100%;
    width: 100%;
    background-color: #272a37;
    border-radius: 10px;

    .homeContainer {
      height: 100%;

      .homeContenr-left {
        background-color: aqua;
        // height: 100%;
      }

      .omeContenr-main {
        background-color: blueviolet;
        // height: 100%;
      }

      .homeContenr-right {
        background-color: antiquewhite;
        // height: 100%;
      }
    }

  }
}
</style>
