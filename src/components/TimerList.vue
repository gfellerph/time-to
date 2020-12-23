<template>
  <ol class="timer-list">
    <li v-for="(timer, index) in timers" :key="timer.id">
      <Timer :timer="timer" :ref="trackRef" :index="index" />
    </li>
  </ol>
</template>

<script>
import Timer from './TimerItem.vue';

let handlers = new Map()

export default {
  components: {
    Timer,
  },
  data() {
    return {
      timerRefs: new Map(),
      lastFocus: null
    }
  },
  mounted() {
    const num = this.mitt.on('num-key', num => {
      const i = Math.min(num, this.timerRefs.size) - 1
      this.timerRefs.get(i).focus()
      this.lastFocus = i
    })
    const del = this.mitt.on('delete', () => {
      setTimeout(() => {
        if (this.timerRefs.size === 0) {
          this.mitt.emit('esc')
          return
        }
        const nextFocus = this.lastFocus === 0 ? 0 : this.lastFocus - 1
        this.timerRefs.get(nextFocus).focus()
        this.lastFocus = nextFocus
      }, 1)
    })
    handlers.set('num-key', num)
    handlers.set('delete', del)
  },
  beforeUpdate() {
    this.timerRefs.clear()
  },
  beforeUnmount() {
    handlers.forEach((handler, event) => this.mitt.off(event, handler))
  },
  computed: {
    timers() {
      return this.$store.state.timers
    }
  },
  methods: {
    trackRef(ref) {
      if (ref) this.timerRefs.set(ref.index, ref)
    }
  }
}
</script>

<style scoped>
  .timer-list {
    margin: 0;
    padding-left: 0;
    list-style: none;
    height: 100%;
    justify-self: stretch;
    border-bottom: 4px solid black;
  }
  
  .timer-list li {
    height: calc(100% / 9);
  }
</style>