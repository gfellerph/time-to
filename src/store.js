import { createStore } from "vuex";
import { nanoid } from 'nanoid';

let timerInterval;

export const store = createStore({
  state () {
    return {
      timers: [],
    }
  },
  mutations: {
    addTimer (state, name) {
      state.timers.push({
        name,
        id: nanoid(),
        running: false,
        times: []
      })
    },
    removeTimer (state, id) {
      state.timers = state.timers.filter(timer => id !== timer.id)
    },
    startTimer (state, id) {
      let currentTimer;
      state.timers.forEach(timer => {
        timer.running = timer.id === id
        if (timer.id === id) currentTimer = timer
      })
      
      const currentTimeSlice = {
        date: new Date(),
        time: 0
      }
      currentTimer.times.push(currentTimeSlice)
      timerInterval = setInterval(() => {
        currentTimeSlice.time += 1
      }, 1000);
    },
    stopTimer (state, id) {
      const timer = state.timers.find(timer => timer.id === id)
      if (timer) timer.running = false
      if (timerInterval) clearInterval(timerInterval)
    }
  }
})