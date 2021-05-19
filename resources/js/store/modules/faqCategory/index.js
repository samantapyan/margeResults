import { http } from '../../../api'

const faqCategory = {
  namespaced: true,
  state: {
    faqCategories: [],
    faqCategory: {}
  },
  actions: {
    getFaqCategories: ({ commit }) => {
      return http.get('/faq-category').then(res => {
        commit('setFaqCategories', res.data.data)
      })
    },
    getAllFaqCategories: ({ commit }) => {
      return http.get('/faq-category/get-all').then(res => {
        commit('setFaqCategories', res.data.data)
      })
    },
    getFaqCategory: ({ commit }, id) => {
      return http.get('/faq-category/' + id).then(res => {
        commit('setFaqCategory', res.data.data)
        return res.data
      })
    },
    create: ({ commit }, params) => {
      return http.post('/faq-category', params).then(res => {
        return res
      })
    },
    update: ({ commit }, params) => {
      return http.put('/faq-category/' + params.id, params.data).then(res => {
        return res
      })
    },
    delete: ({ commit }, id) => {
      return http.delete('/faq-category/' + id).then(res => {
        if (res.data.deleteType === 'forceDelete') {
          commit('removeFaqCategory', id)
        } else {
          commit('updateFaqCategoryStatus', { id: id, status: 'inactive' })
        }
      })
    },
    restore: ({ commit }, id) => {
      return http.get('/faq-category/' + id + '/restore').then(res => {
        commit('updateFaqCategoryStatus', { id: id, status: 'active' })
      })
    }
  },
  mutations: {
    setFaqCategories (state, data) {
      state.faqCategories = data
    },
    updateFaqCategory (state, data) {
      state.faqCategories = state.faqCategories.map(faqCategory => {
        if (faqCategory.id === data.id) {
          faqCategory = data
        }
        return faqCategory
      })
    },
    updateFaqCategoryStatus (state, data) {
      state.faqCategories = state.faqCategories.map(faqCategory => {
        if (faqCategory.id === data.id) {
          faqCategory.status = data.status
        }
        return faqCategory
      })
    },
    removeFaqCategory (state, id) {
      state.faqCategories = state.faqCategories.filter(faqCategory => faqCategory.id !== id)
    },
    setFaqCategory (state, data) {
      state.faqCategories = data
    }
  },
  getters: {
    faqCategories: state => state.faqCategories,
    faqCategory: state => state.faqCategory
  }
}

export default faqCategory
