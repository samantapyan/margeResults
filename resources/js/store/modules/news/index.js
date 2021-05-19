import { http } from '../../../api'

const faq = {
  namespaced: true,
  state: {
    newsList: [],
    news: null
  },
  actions: {
    getAllNews: ({ commit }) => {
      return http.get('/news').then(res => {
        commit('setNewsList', res.data.data)
      })
    },
    getNews: ({ commit }, params) => {
      return http.get('/news/' + params.id).then(res => {
        commit('setNews', res.data.data)
      })
    },
    deleteNews: ({ commit }, params) => {
      return http.delete('/news/' + params.id).then(res => {
        commit('setNewsListAfterDelete', params.id)
      })
    },
    restoreNews: ({ commit }, params) => {
      return http.get('/news/' + params.id + '/restore').then(res => {
      })
    },
    getWithTrashedNews: ({ commit }) => {
      return http.get('/news').then(res => {
        commit('setNewsList', res.data.data)
      })
    },
    updateNews: ({ commit }, params) => {
      return http.post('/news/' + params.id, params.data).then(res => {
      })
    },
    createNews: ({ commit }, params) => {
      return http.post('/news', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return res.data
      })
    }
  },
  mutations: {
    setNewsList (state, data) {
      state.newsList = data
    },
    setNews (state, data) {
      state.news = data
    },
    setNewsListAfterDelete (state, id) {
      state.newsList = state.newsList.filter(item => item.id !== id)
    }
  },
  getters: {
    newsList: state => state.newsList
  }
}

export default faq
