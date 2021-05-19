import { http } from '../../../api'

const language = {
  namespaced: true,
  state: {
    languages: []
  },
  actions: {
    getAllLanguages: ({ commit }) => {
      return http.get('/language/get-all').then(res => {
        commit('setLanguages', res.data.data)
      })
    },
    getLanguages: ({ commit }) => {
      return http.get('/language').then(res => {
        commit('setLanguages', res.data.data)
      })
    },
    getLanguage: ({ commit }, id) => {
      return http.get('/language/' + id).then(res => {
        commit('setLanguages', res.data.data)
        return res.data
      })
    },
    createLanguage: ({ commit }, params) => {
      return http.post('/language', params).then(res => {
        return res
      })
    },
    updateLanguage: ({ commit }, params) => {
      return http.put('/language/' + params.id, params.data).then(res => {
        return res
      })
    },
    delete: ({ commit }, id) => {
      return http.delete('/language/' + id).then(res => {
        if (res.data.deleteType === 'forceDelete') {
          commit('removeLanguage', id)
        } else {
          commit('updateLanguageStatus', { id: id, status: 'inactive' })
        }
      })
    },
    restore: ({ commit }, id) => {
      return http.get('/language/' + id + '/restore').then(res => {
        commit('updateLanguageStatus', { id: id, status: 'active' })
      })
    }
  },
  mutations: {
    setLanguages (state, data) {
      state.languages = data
    },
    updateLanguageStatus (state, data) {
      state.languages = state.languages.map(language => {
        if (language.id === data.id) {
          language.status = data.status
        }
        return language
      })
    },
    updateLanguage (state, data) {
      state.languages = state.languages.map(language => {
        if (language.id === data.id) {
          language = data
        }
        return language
      })
    },
    removeLanguage (state, id) {
      state.languages = state.languages.filter(language => language.id !== id)
    }
  },
  getters: {
    languages: state => state.languages
  }
}

export default language
