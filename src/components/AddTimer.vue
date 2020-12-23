<template>
  <div class="add-timer">
    <input type="text" v-model="timerName" @keydown.enter="addTimer">
    <button @click="addTimer">Add Timer</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    data() {
      return {
        timerName: '',
      };
    },
    methods: {
      addTimer() {
        if (this.timerName === '') return
        this.$store.commit('addTimer', this.timerName)
        this.timerName = ''
      }
    }
  });
</script>

<style>
  
</style>
