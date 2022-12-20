<template>
  <div class="card">
    <button type="button" @click="store.increment">
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

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
