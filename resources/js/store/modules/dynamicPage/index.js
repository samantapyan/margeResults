import { http } from '../../../api'

const dynamicPage = {
  namespaced: true,
  state: {
    dynamicPageList: [],
    dynamicPage: null
  },
  actions: {
    getAllDynamicPages: ({ commit }) => {
      return http.get('/dynamic-page').then(res => {
        commit('setDynamicPagesList', res.data.data)
      })
    },
    createDynamicPage: ({ commit }, params) => {
      return http.post('/dynamic-page', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return res.data
      })
    },
    deleteDynamicPage: ({ commit }, params) => {
      return http.delete('/dynamic-page/' + params.id).then(res => {
        commit('setDynamicPagesListAfterDelete', params.id)
      })
    },
    restoreDynamicPage: ({ commit }, params) => {
      return http.get('/dynamic-page/' + params.id + '/restore').then(res => {
      })
    },
    getDynamicPage: ({ commit }, params) => {
      return http.get('/dynamic-page/' + params.id).then(res => {
        commit('setDynamicPage', res.data.data)
      })
    },
    updateDynamicPage: ({ commit }, params) => {
      return http.put('/dynamic-page/' + params.id, params.data).then(res => {
      })
    }
  },
  mutations: {
    setDynamicPagesList (state, data) {
      state.dynamicPageList = data
    },
    setDynamicPagesListAfterDelete (state, id) {
      state.dynamicPageList = state.dynamicPageList.filter(item => item.id !== id)
    },
    setDynamicPage (state, data) {
      state.dynamicPage = data
    }
  },
  getters: {
    dynamicPageList: state => state.dynamicPageList,
    dynamicPage: state => state.dynamicPage
  }
}

export default dynamicPage
