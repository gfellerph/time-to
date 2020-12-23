<template>
  <div class="time-to" tabindex="-1" @keydown="keydown">
    <h1>time to</h1>
    <AddTimer />
    <TimerList />
  </div>
</template>

<script>
import AddTimer from './components/AddTimer.vue'
import TimerList from './components/TimerList.vue'

export default {
  name: 'App',
  components: {
    AddTimer,
    TimerList
  },
  data() {
    return {
      focus: null
    }
  },
  methods: {
    keydown(event) {
      console.log(event)

      // A number
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
        this.mitt.emit('num-key', +event.key)
      }

      // Direction
      if (event.keyCode === 27) this.mitt.emit('esc')
      if (event.keyCode === 33) this.mitt.emit('page-up')
      if (event.keyCode === 34) this.mitt.emit('page-down')
      if (event.keyCode === 35) this.mitt.emit('end')
      if (event.keyCode === 36) this.mitt.emit('home')
      if (event.keyCode === 37) this.mitt.emit('left')
      if (event.keyCode === 38) this.mitt.emit('up')
      if (event.keyCode === 39) this.mitt.emit('right')
      if (event.keyCode === 40) this.mitt.emit('down')
    }
  }
}
</script>
