<template>
  <ul>
    <li v-for="timer in timers" :key="timer.id">
      <Timer :timer="timer" />
    </li>
  </ul>
</template>

<script>
import Timer from './TimerItem.vue';

export default {
  components: {
    Timer,
  },
  computed: {
    timers() {
      return this.$store.state.timers
    }
  }
}
</script>

<style>

</style>