<template>
  <div class="card">
    <button type="button" @click="store.increment" class="button">
      Double count is {{ store.doubleCounter }}
    </button>
  </div>
</template>

<script lang="ts">
import { useCounterStore } from '@/store/counter'

export default {
  name: 'Counter',
  setup() {
    const store = useCounterStore()

    return { store }
  }
}
</script>

<style scoped lang="less">
.read-the-docs {
  color: #888;
}
.button {
  font-size: 26px;
  width: 300px;
  height: 80px;
}
</style>
