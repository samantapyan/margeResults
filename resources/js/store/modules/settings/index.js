import { http } from '../../../api'

const settings = {
  namespaced: true,
  state: {
    users: [],
    selectedImage: null,
    activeBackgroundImage: null,
    projectImages: [],
    activeFont: null
  },
  actions: {
    uploadImage: ({ commit }, {data, config}) => {
      return http.post('/settings', data, config).then(res => {
            commit('setImage', res.data)
      })
    },
    getActiveFont: ({commit})=> {
      return http.get('/font/active-font').then(res =>{
        console.log("res.data", res.data)
       commit('setActiveFont',res.data )
      })
    },
    setActiveFont: ({commit}, data)=> {
      return http.post('/font/active-font', data).then(res =>{
        console.log("res.data", res.data)
        commit('setActiveFont', data )
      })
    },
    getImage: ({commit})=> {
      return http.get('/settings').then(res => {
        commit('setProjectImages', res.data)
      })
    },
    updateStyleImage: ({commit}, data)=> {
      return http.put('/settings/'+ data.id, data).then(res => {
        // commit('setProjectImages', res.data)
      })
    },
    setActiveImage: ({commit}, data) => {
      return http.post('/settings/set-active/' + data.id, data).then(res => {
        commit('setProjectActiveImage', data)
      })
    },
    getActiveImage:({commit}) =>{
      return http.get('/settings/active-image').then(res =>{
        console.log(res)
        commit('setActiveBackgroundImage', res.data)
      })
    }
  },
  mutations: {
    setActiveBackgroundImage(state, data){
      state.activeBackgroundImage = data
    },
    setActiveFont(state, data){
      console.log("fffff", data)
      state.activeFont = data
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
      state.activeBackgroundImage = data
      state.projectImages.forEach(d => {
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
      state.projectImages = newData
    },
    setProjectImages(state, data){
        console.log("data===", data)
        state.projectImages = data
        state.selectedImage = data.find(img => img.isActive === true || img.isActive === 1)

    }
  },
  getters: {
    projectImages: state => state.projectImages,
    selectedImage: state => state.selectedImage,
    activeFont: state => state.activeFont
  }
}

export default settings
