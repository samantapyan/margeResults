import { http } from '../../../api'

const auth = {
  namespaced: true,
  state: {
    user: {},
    mode: true,
    darkMode: false,
    isAuthenticated: false,
    token: null
  },
  actions: {
    changeThemeMode: ({ commit }, data) => {
        commit('setThemeMode', data)
    },
    getNewPassword: ({ commit }, params) => {
      return http.post('/forgot-password', params).then(res => {
        commit('userLogin', res.data)
      })
    },
    login: ({ commit }, params) => {
      return http.post('/login', params).then(res => {
        commit('userLogin', res.data)
      })
    },
    logout: ({ commit }) => {
      return http.get('/logout').then(() => {
        commit('userLogout')
      })
    }
  },
  mutations: {
    setThemeMode(state, data) {
      state.darkMode = data
    },
    userLogin (state, data) {
      const accessToken = data.access_token
      localStorage.setItem('access_token', accessToken)
      localStorage.setItem('user', JSON.stringify(data.user))
      http.defaults.headers.common.Authorization = accessToken
      state.isAuthenticated = true
      state.token = accessToken
      state.user = data.user
    },
    userLogout (state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      http.defaults.headers.common.Authorization = ''
      state.isAuthenticated = false
      state.access_token = null
      state.user = null
    },
    setUser (state, data) {
      state.user = data
    }
  },
  getters: {
    user: state => state.user,
    darkMode: state =>state.darkMode,
    isAuthenticated: state => state.isAuthenticated
  }
}

export default auth
