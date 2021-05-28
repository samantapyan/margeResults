import { http } from '../../../api'

const settings = {
  namespaced: true,
  state: {
    users: [],
    tableColor: null,
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
    setTableColor: ({commit}, data)=> {
      return http.post('/color', data).then(res => {
         commit('setAfterColorSelect', res.data.data.color)
      })
    },
    deleteBackgroundImage: ({commit}, data)=> {
      return http.post('/delete-background/'+ data.id).then(res => {
         commit('setImagesProject', data.id)
      })
    },
    getTableColor: ({commit}, data)=> {
      return http.post('/table-color-get', data).then(res => {
        commit('setTableColorData', res.data.data)
      })
    },
    getActiveFont: ({commit})=> {
      return http.get('/font/active-font').then(res =>{
       commit('setActiveFont',res.data )
      })
    },
    setActiveFont: ({commit}, data)=> {
      return http.post('/font/active-font', data).then(res =>{
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
    setAfterColorSelect(state, color) {
        state.tableColor = color
    },
    setImagesProject(state, id) {
      state.projectImages =   state.projectImages.filter(img => img.id !== id)
      console.log("selecteeeeeee", state.selectedImage, id)
          if (state.activeBackgroundImage && state.activeBackgroundImage.id === id) {
            state.activeBackgroundImage = null
          }
    },
    setTableColorData(state, data) {
      state.tableColor = data.color
    },
    setActiveBackgroundImage(state, data){
      state.activeBackgroundImage = data
    },
    setActiveFont(state, data){
      state.activeFont = data
    },
      setImage(state, user) {

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
      state.projectImages = newData
    },
    setProjectImages(state, data){
        state.projectImages = data
        state.selectedImage = data.find(img => img.isActive === true || img.isActive === 1)

    }
  },
  getters: {
    projectImages: state => state.projectImages,
    selectedImage: state => state.selectedImage,
    activeFont: state => state.activeFont,
    tableColor: state => state.tableColor
  }
}

export default settings
