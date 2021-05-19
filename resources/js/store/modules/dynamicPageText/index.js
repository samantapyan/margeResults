import { http } from '../../../api'

const dynamicPageText = {
  namespaced: true,
  state: {
    dynamicPageTextList: [],
    dynamicPageText: null
  },
  actions: {
    getAllDynamicPageTexts: ({ commit }) => {
      return http.get('/dynamic-page-text').then(res => {
        commit('setDynamicPageTextsList', res.data.data)
      })
    },
    createDynamicPageText: ({ commit }, params) => {
      return http.post('/dynamic-page-text', params).then(res => {
        return res.data
      })
    },
    deleteDynamicPageText: ({ commit }, params) => {
      return http.delete('/dynamic-page-text/' + params.id).then(res => {
        commit('setDynamicPageTextsListAfterDelete', params.id)
      })
    },
    restoreDynamicPageText: ({ commit }, params) => {
      return http.get('/dynamic-page-text/' + params.id + '/restore').then(res => {
      })
    },
    getDynamicPageText: ({ commit }, params) => {
      return http.get('/dynamic-page-text/' + params.id).then(res => {
        commit('setDynamicPageText', res.data.data)
      })
    },
    updateDynamicPageText: ({ commit }, params) => {
      return http.put('/dynamic-page-text/' + params.id, params.data).then(res => {
      })
    }
  },
  mutations: {
    setDynamicPageTextsList (state, data) {
      state.dynamicPageTextList = data
    },
    setDynamicPageTextsListAfterDelete (state, id) {
      state.dynamicPageTextList = state.dynamicPageTextList.filter(item => item.id !== id)
    },
    setDynamicPageText (state, data) {
      state.dynamicPageText = data
    }
  },
  getters: {
    dynamicPageTextList: state => state.dynamicPageTextList,
    dynamicPageText: state => state.dynamicPageText
  }
}

export default dynamicPageText
