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
    hydrateStore (state) {
      if (localStorage?.getItem('timers')) {
        const mergedState = Object.assign(
          state,
          JSON.parse(localStorage.getItem('timers'))
        )
        mergedState.timers = mergedState.timers.map(timer => {
          timer.running = false;
          return timer;
        })

        this.replaceState(mergedState)
      }
    },
    addTimer (state, name) {
      state.timers.push({
        name,
        id: nanoid(),
        running: false,
        times: {}
      })
    },
    removeTimer (state, id) {
      state.timers = state.timers.filter(timer => id !== timer.id)
    },
    incrementTimer (state, payload) {
      payload.timer.times[payload.timeSlice.id] = {
        ...payload.timeSlice,
        time: payload.timeSlice.time += 1
      }
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
      currentTimer.times[currentTimeSlice.id] = currentTimeSlice
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
  },
  getters: {
    seconds: (state) => (id) => {
      return Object
        .values(state.timers.find(timer => timer.id === id).times)
        .reduce((acc, time) => acc += time.time, 0)
    }
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('timers', JSON.stringify(state))
})