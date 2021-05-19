import { http } from '../../../api'

const faq = {
  namespaced: true,
  state: {
    faqList: []
  },
  actions: {
    getAllFaqs: ({ commit }) => {
      return http.get('/faq/get-all').then(res => {
        commit('setFaqList', res.data.data)
      })
    },
    getFaqList: ({ commit }) => {
      return http.get('/faq').then(res => {
        commit('setFaqList', res.data.data)
      })
    },
    getFaq: ({ commit }, id) => {
      return http.get('/faq/' + id).then(res => {
        commit('setFaq', res.data.data)
        return res.data
      })
    },
    create: ({ commit }, params) => {
      return http.post('/faq', params).then(res => {
        return res
      })
    },
    update: ({ commit }, params) => {
      return http.put('/faq/' + params.id, params.data).then(res => {
        return res
      })
    },
    restore: ({ commit }, id) => {
      return http.get('/faq/' + id + '/restore').then(res => {
        commit('updateFaqStatus', { id: id, status: 'active' })
      })
    },
    deleteFaq: ({ commit }, id) => {
      return http.delete('/faq/' + id).then(res => {
        if (res.data.deleteType === 'forceDelete') {
          commit('removeFaq', id)
        } else {
          commit('updateFaqStatus', { id: id, status: 'inactive' })
        }
      })
    }
  },
  mutations: {
    setFaqList (state, data) {
      state.faqList = data
    },
    updateFaqStatus (state, data) {
      state.faqList = state.faqList.map(faq => {
        if (faq.id === data.id) {
          faq.status = data.status
        }
        return faq
      })
    },
    removeFaq (state, id) {
      state.faqList = state.faqList.filter(faq => faq.id !== id)
    },
    setFaq (state, data) {
      state.faq = data
    }
  },
  getters: {
    faqList: state => state.faqList,
    faq: state => state.faq
  }
}

export default faq
