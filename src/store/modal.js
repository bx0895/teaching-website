export default {
  namespaced: true,
  state: {
    isShow: false,
    type: '',
    editForm: {},
    selectForm: {},
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
    },
    CHANGE_SELECT_FORM (state, paylode) {
      state.selectForm = paylode
    },
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