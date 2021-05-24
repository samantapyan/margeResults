import { http } from '../../../api'

const users = {
  namespaced: true,
  state: {
    users: [],
  },
  actions: {
    getUsers: ({ commit }) => {
      return http.get('/users').then(res => {
            commit('setUsers', res.data.data)
          })

    },
    addUser: ({ commit }, params) => {
      return http.post('/users', params).then(res => {
        console.log("ok")
         commit('changeUsers', res.data.data)
      })
    },
   updateUser: ({ commit }, params) => {
      return http.put('/users/'+params.id, params).then(res => {
        console.log("ok")
       commit('refreshUsers', res.data.data)
      })
    },
addMarginPrice: ({commit}, data) =>{
        return http.post('user/add-margin', {...data }).then(res=> {
            console.log("reeeeeeee", res)
           commit('setUsersAfterUpdate', data)

        })
},
      deleteUser: ({ commit }, params) => {
          return http.delete('/users/'+params.id).then(res => {
              console.log("ok")
             commit('setUsersData', params.id)
          })
      },



    // changeThemeMode: ({ commit }, data) => {
    //     commit('setThemeMode', data)
    // },
    // getNewPassword: ({ commit }, params) => {
    //   return http.post('/forgot-password', params).then(res => {
    //     commit('userLogin', res.data)
    //   })
    // },
    // login: ({ commit }, params) => {
    //   return http.get('/login', params).then(res => {
    //     commit('userLogin', res.data)
    //   })
    // },
    // logout: ({ commit }) => {
    //   return http.get('/logout').then(() => {
    //     commit('userLogout')
    //   })
    // }
  },
  mutations: {
      refreshUsers(state, user) {
          let newData = []
          let usersData = [...state.users]
          usersData.forEach(u => {
              if (u.id === user.id) {
                  newData.push({...user})
              } else {
                  newData.push(u)
              }
          })
          console.log("x=",newData);
          state.users = newData
      },
    setUsers(state, data) {
        let newArrUser = [...data]
        console.log('receive.', data)
        newArrUser.sort(function (a, b) {
            if (a.marge > b.marge) {
                return -1;
            }
            if (a.marge < b.marge) {
                return 1;
            }
            // a должно быть равным b
            return 0;
        })
      console.log('receive.', data)
      state.users = newArrUser
    },
      setUsersAfterUpdate(state, data) {
          let newArrUser = []
          state.users.forEach(u => {
              if (u.id=== data.id){
                  console.log("aa", {...u, marge: data.price})
                  newArrUser.push(data)
              } else {
                  newArrUser.push({...u})
              }
          })
          state.users = newArrUser
      },
      changeUsers(state, data) {
        let newArrUser = [...state.users, data]
          console.log('receive.', data)
          newArrUser.sort(function (a, b) {
              if (a.marge > b.marge) {
                  return -1;
              }
              if (a.marge < b.marge) {
                  return 1;
              }
              // a должно быть равным b
              return 0;
          })
          state.users = newArrUser
      },
      setUsersData(state, id) {
        state.users = state.users.filter(u => u.id !== id)
      }
    // setThemeMode(state, data) {
    //   state.darkMode = data
    // },
    // userLogin (state, data) {
    //   const accessToken = data.access_token
    //   localStorage.setItem('access_token', accessToken)
    //   localStorage.setItem('user', JSON.stringify(data.user))
    //   http.defaults.headers.common.Authorization = accessToken
    //   state.isAuthenticated = true
    //   state.token = accessToken
    //   state.user = data.user
    // },
    // userLogout (state) {
    //   localStorage.removeItem('access_token')
    //   localStorage.removeItem('user')
    //   http.defaults.headers.common.Authorization = ''
    //   state.isAuthenticated = false
    //   state.access_token = null
    //   state.user = null
    // },
    // setUser (state, data) {
    //   state.user = data
    // }
  },
  getters: {
    users: state => state.users,

  }
}

export default users
