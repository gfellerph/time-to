<template>
  <h2>{{timer.name}} - {{getTimeString}}</h2>
  <button @click="removeTimer">x</button>
  <button @click="toggleTimer">
    <span v-show="!timer.running">></span>
    <span v-show="timer.running">||</span>
  </button>
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
      }
    },
    computed: {
      getTimeString() {
        const seconds = this.timer.times.reduce((acc, timeSlice) => acc + timeSlice.time, 0);
        return seconds || new Date(seconds * 1000).toISOString().substring(11, 8)
      }
    }
  }
</script>

<style scoped>
  
</style>
