import { http } from '../../../api'

const users = {
  namespaced: true,
  state: {
    users: [],
  },
  actions: {
    getUsers: ({ commit }) => {
      return http.get('/users').then(res => {
          console.log("sam",res.data.data)
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

      deleteUserMarginPrice:({commit}, params) =>{
          return http.delete('/margin-price/' + params.priceId).then(res => {
              console.log("ok")
              commit('setUserPricesAfterDelete', params)
          })
       },

addMarginPriceToUser: ({commit}, params) => {
    return http.post('/margin-price', params).then(res => {
        console.log("ok___", res)
         commit('setUsersDataAfterAddPrice', {...params, id :res.data.data.id})
    })
},

      cleanMargin: ({commit}, params) => {
          return http.post('clean/').then(res => {
             commit('setUsersDataAfterClean')
          })
      },



      updatePriceOfUser: ({commit}, params) => {
          return http.post('/margin-price-update/'+ params.id, params).then(res => {
              // console.log("ok___", res)
              // commit('setUsersDataAfterAddPrice', {...params, id :res.data.data.id})
          })
      }

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
      setUsersDataAfterClean(state, data) {
          let usersData = [...state.users]
          let newData = []
          usersData.forEach(u => {
              newData.push({...u, prices:[]})

          })
          console.log("x=",newData);
          state.users = newData
      },
      setUserPricesAfterDelete(state, data) {
          // let user = state.users.find(u => u.id === data.user_id)
          // user.prices.push(data)
          // console.log("us=",user)
          // let newArrUser = []
          //
          // state.users.forEach(u => {
          //     if (u.id !== data.user_id ) {
          //         return newArrUser.push(u)
          //     } else {
          //         newArrUser.push({...u, prices : u.prices.filter(pr => pr.id !== data.priceId)})
          //     }
          // })
          //
          // console.log('receive.', data)
          // console.log('all.', newArrUser)
          // newArrUser.sort(function (a, b) {
          //     console.log("a:______", a.marge)
          //     let price1 =0
          //     if (a.prices.length) {
          //         a.prices.forEach((el,i) => {
          //             price1+= +el.margin
          //         })
          //     }
          //     let price2 =0
          //     if (b.prices.length) {
          //         b.prices.map((el,i) => {
          //             price2+= +el.margin
          //         })
          //     }
          //     if (price1 > price2) {
          //         return -1;
          //     }
          //     if (price1 < price2) {
          //         return 1;
          //     }
          //     // a должно быть равным b
          //     return 0;
          // })
          // state.users = newArrUser


      },
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
        newArrUser.sort(function (a, b) {
            console.log("a:______", a.marge)
            let price1 =0
           if (a.prices.length) {
               a.prices.forEach((el,i) => {
                   price1+= +el.margin
               })
           }
           let price2 =0
            if (b.prices.length) {
                b.prices.map((el,i) => {
                    price2+= +el.margin
                })
            }


            if (price1 > price2) {
                return -1;
            }
            if (price1 < price2) {
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

          newArrUser.sort(function (a, b) {
              console.log("a:______", a.marge)
              let price1 =0
              if (a.prices.length) {
                  a.prices.forEach((el,i) => {
                      price1+= +el.margin
                  })
              }
              let price2 =0
              if (b.prices.length) {
                  b.prices.map((el,i) => {
                      price2+= +el.margin
                  })
              }
              if (price1 > price2) {
                  return -1;
              }
              if (price1 < price2) {
                  return 1;
              }
              // a должно быть равным b
              return 0;
          })
          state.users = newArrUser
      },

      setUsersDataAfterAddPrice(state, data) {
          console.log("+-",data);
          let user = state.users.find(u => u.id === data.user_id)
          user.prices.push(data)
          console.log("us=",user)
          let newArrUser = []

           state.users.forEach(u => {
             if (u.id === data.id ) {
                 newArrUser.push(data)
             }
             return newArrUser.push(u)
          })

          console.log('receive.', data)
          console.log('all.', newArrUser)
          newArrUser.sort(function (a, b) {
              console.log("a:______", a.marge)
              let price1 =0
              if (a.prices.length) {
                  a.prices.forEach((el,i) => {
                      price1+= +el.margin
                  })
              }
              let price2 =0
              if (b.prices.length) {
                  b.prices.map((el,i) => {
                      price2+= +el.margin
                  })
              }
              if (price1 > price2) {
                  return -1;
              }
              if (price1 < price2) {
                  return 1;
              }
              // a должно быть равным b
              return 0;
          })
          state.users = newArrUser
      },




      changeUsers(state, data) {
        let newArrUser = [...state.users, data]
          console.log('receive.', data)
          newArrUser.sort(function (a, b) {
              console.log("a:______", a.marge)
              let price1 =0
              if (a.prices.length) {
                  a.prices.forEach((el,i) => {
                      price1+= +el.margin
                  })
              }
              let price2 =0
              if (b.prices.length) {
                  b.prices.map((el,i) => {
                      price2+= +el.margin
                  })
              }
              if (price1 > price2) {
                  return -1;
              }
              if (price1 < price2) {
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
