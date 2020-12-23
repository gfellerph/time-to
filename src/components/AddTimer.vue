<template>
  <input type="text" v-model="timerName" @keydown.stop.enter="addTimer">
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
