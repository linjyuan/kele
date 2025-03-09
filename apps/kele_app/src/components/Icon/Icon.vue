<template>
  <i :class="iconClass" :style="innerStyle" />
</template>
<script lang="ts" setup>
import { computed, type CSSProperties, withDefaults } from 'vue'
import { type IconProps } from "./index.type"

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
})

const iconClass = computed(() => {
  return [
    {
      mallchat: !props.colorful,
      mallchatcolor: props.colorful,
      [`icon-spin`]: props.spin,
    },
    `icon-${props.icon}`,
  ]
})

const innerStyle = computed(() => {
  const styles: CSSProperties = {}
  if (props.size) {
    styles.fontSize = typeof props.size === 'number' ? `${props.size}px` : props.size
  }
  if (props.rotate) {
    styles.transform = `rotate(${props.rotate}deg)`
  }
  return styles
})
</script>
