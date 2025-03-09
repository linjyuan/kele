<template>
  <div class="keleui_fontview" :style="{ backgroundColor: props?.backgroundColor ?? '#fff', }">
    <span class="keleui_fontview_font" v-for="(item, index) in props.txtconfig" :key="index"
      :style="getStyle(item, index)">
      {{ item.txt }}
    </span>
  </div>
</template>
<script setup lang='ts'>
import { defineProps } from "vue"
import { type FontViewProps } from "./index.d"
const props = defineProps<FontViewProps>()

function getStyle(item: any, index: number) {
  return {
    fontSize: `${item?.size ? item.size + 'px' : '16px'}`,
    color: item?.color ?? '#000',
    opacity: item?.opacity ?? 1,
    transform: item?.transform ?? 'none',
    backgroundColor: item?.backgroundColor ?? '#fff',
    width: index !== 0 && props.txtconfig?.[index - 1]?.wrap === true ? 'fit-content' : 'auto',
    // height: item?.height ?? 'auto',
    display: index !== 0 && props.txtconfig?.[index - 1]?.wrap === true ? 'block' : 'inline-block',
  }
}
</script>
<style scoped lang='scss'>
.keleui_fontview {
  .keleui_fontview_font {
    // display: inline-block;
  }
}
</style>
