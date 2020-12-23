<template>
  <input
    class="add-timer"
    type="text"
    placeholder="add timer [enter]"
    v-model="timerName"
    @keydown.stop.enter="addTimer"
    ref="inputRef"
  >
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  let handler;

  export default defineComponent({
    data() {
      return {
        timerName: '',
      };
    },
    mounted() {
      const self = this
      this.focus()
      handler = this.mitt.on('esc', () => self.focus())  
    },
    beforeUnmount() {
      this.mitt.off('esc', handler)
    },
    methods: {
      addTimer() {
        if (this.timerName === '') return
        this.$store.commit('addTimer', this.timerName)
        this.timerName = ''
      },
      focus() {
        this.$refs.inputRef.focus()
      }
    }
  });
</script>

<style scoped>
  .add-timer {
    display: block;
    width: 100%;
    height: 10vh;
    border: 4px solid black;
    padding: 0 2rem;
    font-size: 2em;
    border-radius: 0;
    font-weight: bold;
  }

  .add-timer:focus {
    background: var(--focus-color);
    color: white;
    outline: none;
  }

  .add-timer:focus::placeholder {
    color: rgba(255,255,255, 0.5);
  }
</style>
