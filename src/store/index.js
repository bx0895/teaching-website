import Vue from 'vue'
import Vuex from 'vuex'
import store from 'store'
import http from '@/api/http'
import base from '@/config/base.config'
import modal from '@/store/modal'
import editModal from '@/store/editModal'

Vue.use(Vuex)
const { TOKEN_NAME,LOGIN_TYPE,USER } = base

const USER_MAP = {
  'teacher': 'tea_id',
  'admin': 'adm_id',
  'student':'stu_id'
}
export default new Vuex.Store({
  state: {
    loginType: store.get(LOGIN_TYPE) || '',
    asideType: '',
    token: store.get(TOKEN_NAME) || '',
    userInfo: '',
    userId: store.get(USER) || ''
  },

  getters: {
    asideType (state) {
      if (state.asideType !== '') {
        return state.asideType
      }
      return sessionStorage.getItem('aside')
    },
    loginType (state) {
      return state.loginType
    },
    userInfo (state) {
      if (state.userInfo !== '') {
        return state.userInfo
      }
      return JSON.parse(sessionStorage.getItem('us'))
    }
  },

  mutations: {
    SET_LOGIN_TYPE (state) {
      state.loginType = store.get(LOGIN_TYPE)
    },
    SET_ASIDE_TYPE (state,type) {
      state.asideType = type
    },
    SET_TOKEN (state) {
      state.token = store.get(TOKEN_NAME)
    },
    SET_USERINFO (state,userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async login ({ commit, dispatch }) {
      commit('SET_TOKEN')
      dispatch('getUserInfo')
    },
    async getUserInfo ({ commit }) {
      let loginType = store.get(LOGIN_TYPE)
      let idName = USER_MAP[loginType]
      let res = await http(
        {
          type: `${loginType}Info`,
          data:{ q: { [idName]: store.get(USER)} }
        },
      )
      sessionStorage.setItem('us',JSON.stringify(res.result[0]))
      commit('SET_USERINFO', res.result[0])
    }
  },
  modules: {
    modal,
    editModal
  }
})
