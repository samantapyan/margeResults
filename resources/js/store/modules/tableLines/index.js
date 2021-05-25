import { http } from '../../../api'

const tableLines = {
  namespaced: true,
  state: {
    users: [],
    selectedImageLine: null,
      activeBackgroundImageLine: null,
    tableLineImages: []
  },
  actions: {
    uploadImageLine: ({ commit }, {data, config}) => {
      return http.post('/settings-table', data, config).then(res => {
            commit('setImage', res.data)
      })
    },
    getImageLine: ({commit})=> {
      return http.get('/settings-table').then(res => {
        commit('setTableLineImages', res.data)
      })
    },
    updateStyleImageLine: ({commit}, data)=> {
      return http.put('/settings-table/'+ data.id, data).then(res => {
        // commit('setProjectImages', res.data)
      })
    },
    setActiveImageLine: ({commit}, data) => {
      return http.post('/tableLine/change-active/' + data.id, data).then(res => {
        commit('setProjectActiveImage', data)
      })
    },
    getActiveImageLine:({commit}) =>{
      return http.get('/table/active-imageTable/').then(res =>{
        console.log("res U tat", res)
         commit('setactiveBackgroundImageLine', res.data)
      })
    }
  },
  mutations: {
    setactiveBackgroundImageLine(state, data){
      state.activeBackgroundImageLine = data
    },
      setImage(state, user) {
          // let newData = []
          // let usersData = [...state.users]
          // usersData.forEach(u => {
          //     if (u.id === user.id) {
          //         newData.push({...user})
          //     } else {
          //         newData.push(u)
          //     }
          // })
          // state.users = newData
      },
    setProjectActiveImage(state, data){
        let newData = []
      state.activeBackgroundImageLine = data
      state.tableLineImages.forEach(d => {
        if (d.id === data.id) {
          newData.push({...d, isActive: 1})
        } else  {
          if (d.isActive) {
            newData.push({...d, isActive: 0})
          } else{
            newData.push({...d})
          }
        }
      })
      console.log("aaaaaaaaaaaaaaa",newData);
      state.tableLineImages = newData
    },
    setTableLineImages(state, data){
        console.log("data===", data)
        state.tableLineImages = data
        state.selectedImageLine = data.find(img => img.isActive === true || img.isActive === 1)

    }
  },
  getters: {
    tableLineImages: state => state.tableLineImages,
      activeBackgroundImageLineLine:  state => state.activeBackgroundImageLineLine,
    selectedImageLine: state => state.selectedImageLine
  }
}

export default tableLines
