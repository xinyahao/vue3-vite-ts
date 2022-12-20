import { RouteRecordRaw } from 'vue-router'
import Counter from '@/components/Counter.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/counter',
    name: 'counter',
    component: Counter
  }
]

export default routes
