import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      value: 'a',
    }
  },
  mutations: {
    updateValue(state, value) {
      state.value = value
    },
  },
})
