import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snake: false
  }
  // mutations: {
  //   snakeChange (state) {
  //     state.snake = !state.snake
  //   }
  // }
})
