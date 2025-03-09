<template>
  <div class="menu">
    <a class="menu-item" v-if="props.extennalList.length > 0" v-for="(item, index) in props.extennalList" :key="index"
      @click="item?.click()">
      <Icon :icon="item.icon" :size="28" colorful></Icon>
      <span class="menu-item-name" v-if="item.name">{{ item.name }}</span>
    </a>
  </div>
</template>
<script setup lang='ts'>
import { withDefaults, defineProps } from "vue"
import { type ExtennalProps } from "./index.d"
// 获取当前组件入参
const props = withDefaults(defineProps<ExtennalProps>(), {
})

// 获取父组件内容

</script>
<style scoped lang='scss'>
.menu {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 6px 0;
    line-height: 1.2;
    text-align: center;

    .v-icon {
      display: inline-block;
      width: 1em;
      height: 1em;
      font-size: 1em;
    }

    &-name {
      margin-top: 4px;
      font-size: 12px;
      white-space: nowrap;
    }
  }
}

@media only screen and (max-width: 640px) {
  .menu {
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 8px;
    overflow-y: auto;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 8px;
      line-height: 1.2;
      text-align: center;
    }
  }

}
</style>
