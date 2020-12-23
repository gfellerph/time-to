<template>
  <a
    tabindex="0"
    ref="timerItemRef"
    class="timer"
    @keydown.space="toggleTimer"
    @keydown.enter="toggleTimer"
    @keydown.delete="removeTimer"
    @click="toggleTimer"
  >
    <h2>{{timer.name}} - {{getTimeString}}</h2>
    <span v-show="!timer.running">></span>
    <span v-show="timer.running">||</span>
  </a>
</template>

<script>
  export default {
    props: {
      timer: Object,
    },
    methods: {
      removeTimer() {
        this.$store.commit('removeTimer', this.timer.id)
      },
      toggleTimer() {
        this.$store.commit(this.timer.running ? 'stopTimer' : 'startTimer', this.timer.id)
      },
      focus() {
        if (this.$refs.timerItemRef === document.activeElement) {
          this.toggleTimer()
        } else {
          this.$refs.timerItemRef.focus()
        }
      }
    },
    computed: {
      getTimeString() {
        let seconds = 0
        this.timer.times.forEach(timeSlice => seconds += timeSlice.time);
        return seconds ?? new Date(seconds * 1000).toISOString().substring(11, 8)
      }
    }
  }
</script>

<style scoped>
  
</style>
