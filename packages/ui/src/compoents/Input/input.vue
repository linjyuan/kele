<template>
    <div class="kele-inputDiv">
        <input type="input" :value="value" placeholder="请输入">
    </div>
</template>
<script setup lang='ts'>
import {ref} from "vue"
let value = ref('')

</script>
<style scoped lang='scss'>
.kele-inputDiv {
    margin: 0;
    padding: 0;
};
</style>
