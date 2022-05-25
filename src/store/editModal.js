export default {
  namespaced: true,
  state: {
    isShow: false,
    type: '',
    editForm: {},
  },
  mutations: {
    CLOSE (state) {
      state.isShow = false
    },
    OPEN (state) {
      state.isShow = true
    },
    CHANGE_TYPE (state, paylode) {
      state.type = paylode
    },
    CHANGE_TEXT_FORM (state, paylode) {
      state.editForm = paylode
    }
  },
  actions: {
    close ({ commit }) {
      commit('CLOSE')
    },
    open ({ commit }) {
      commit('OPEN')
    }
  },
  modules: {

  }
}