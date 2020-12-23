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
    <span class="index">{{index + 1}}.</span>
    <h2 class="name">{{timer.name}}</h2>
    <time class="time">{{getTimeString}}s</time>
    <div class="indicator">
      <span v-show="!timer.running">⏵︎</span>
      <span v-show="timer.running">⏸︎</span>
    </div>
  </a>
</template>

<script>
  export default {
    props: {
      timer: Object,
      index: Number,
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
        return this.$store.getters.seconds(this.timer.id)
        // return seconds ?? new Date(seconds * 1000).toISOString().substring(11, 8)
      }
    }
  }
</script>

<style scoped>
  .timer {
    display: flex;
    height: 10vh;
    border: 4px solid black;
    font-size: 2em;
    align-items: center;
    font-weight: bold;
  }

  .timer:focus {
    outline: none;
    background-color: var(--focus-color);
    color: white;
  }

  .name {
    margin: 0;
    flex-grow: 1;
  }

  .index {
    padding-right: 1rem;
    padding-left: 2rem;
    text-align: center;
  }

  .indicator {
    justify-self: flex-end;
    padding: 0 2rem;
    font-family: var(--monospace);
  }
</style>
