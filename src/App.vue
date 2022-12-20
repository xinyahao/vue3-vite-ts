<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
  <div class="box">
    <p></p>
  </div>
</template>

<style scoped lang="less">
.box {
  p {
    height: 100px;
    width: 100px;
    background-color: red;
  }
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
