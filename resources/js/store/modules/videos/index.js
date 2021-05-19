import { http } from '../../../api'

const videos = {
  namespaced: true,
  state: {
    videosList: [],
    video: null
  },
  actions: {
    getAllVideos: ({ commit }) => {
      return http.get('/video').then(res => {
        commit('setVideosList', res.data.data)
      })
    },
    createVideos: ({ commit }, params) => {
      return http.post('/video', params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        return res.data
      })
    },
    deleteVideo: ({ commit }, params) => {
      return http.delete('/video/' + params.id).then(res => {
        commit('setVideoListAfterDelete', params.id)
      })
    },
    restoreVideo: ({ commit }, params) => {
      return http.get('/video/' + params.id + '/restore').then(res => {
      })
    },
    getVideo: ({ commit }, params) => {
      return http.get('/video/' + params.id).then(res => {
        commit('setVideo', res.data.data)
      })
    },
    updateVideo: ({ commit }, params) => {
      return http.put('/video/' + params.id, params.data).then(res => {
      })
    }
  },
  mutations: {
    setVideosList (state, data) {
      state.videosList = data
    },
    setVideoListAfterDelete (state, id) {
      state.videosList = state.videosList.filter(item => item.id !== id)
    },
    setVideo (state, data) {
      state.video = data
    }
  },
  getters: {
    videosList: state => state.videosList,
    video: state => state.video
  }
}

export default videos
