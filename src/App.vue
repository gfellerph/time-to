<template>
  <h1>time to</h1>
  <AddTimer />
  <TimerList />
</template>

<script>
import AddTimer from './components/AddTimer.vue'
import TimerList from './components/TimerList.vue'

export default {
  name: 'App',
  components: {
    AddTimer,
    TimerList
  }
}
</script>
