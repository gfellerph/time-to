import { createStore } from "vuex"
import { nanoid } from 'nanoid'

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
        times: new Map()
      })
    },
    removeTimer (state, id) {
      state.timers = state.timers.filter(timer => id !== timer.id)
    },
    incrementTimer (state, payload) {
      payload.timer.times.set(payload.timeSlice.id, {
        ...payload.timeSlice,
        time: payload.timeSlice.time += 1
      })
    },
    startTimer (state, id) {
      let currentTimer;
      state.timers.forEach(timer => {
        timer.running = timer.id === id
        if (timer.id === id) currentTimer = timer
      })
      
      const currentTimeSlice = {
        date: new Date(),
        time: 0,
        id: nanoid()
      }
      currentTimer.times.set(currentTimeSlice.id, currentTimeSlice)
      if (timerInterval) clearInterval(timerInterval)
      timerInterval = setInterval(() => {
        this.commit('incrementTimer', {
          timer: currentTimer,
          timeSlice: currentTimeSlice
        })
      }, 1000);
    },
    stopTimer (state, id) {
      const timer = state.timers.find(timer => timer.id === id)
      if (timer) timer.running = false
      if (timerInterval) clearInterval(timerInterval)
    }
  }
})