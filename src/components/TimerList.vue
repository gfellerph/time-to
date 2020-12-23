<template>
  <ol>
    <li v-for="timer in timers" :key="timer.id">
      <Timer :timer="timer" :ref="trackRef" />
    </li>
  </ol>
</template>

<script>
import Timer from './TimerItem.vue';
let handler;
export default {
  components: {
    Timer,
  },
  data() {
    return {
      timerRefs: []
    }
  },
  mounted() {
    handler = this.mitt.on('num-key', num => {
      console.log(this.timerRefs, num)
      const i = Math.min(num, this.timerRefs.length - 1)
      this.timerRefs[i].focus()
    })
  },
  beforeUnmount() {
    this.mitt.off('num-key', handler)
  },
  computed: {
    timers() {
      return this.$store.state.timers
    }
  },
  methods: {
    trackRef(ref) {
      this.timerRefs.push(ref)
    }
  }
}
</script>

<style>

</style>