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
       commit('refreshUsers', res.data.data)
      })
    },
addMarginPrice: ({commit}, data) =>{
        return http.post('user/add-margin', {...data }).then(res=> {
           commit('setUsersAfterUpdate', data)

        })
},
      deleteUser: ({ commit }, params) => {
          return http.delete('/users/'+params.id).then(res => {
             commit('setUsersData', params.id)
          })
      },

      deleteUserMarginPrice:({commit}, params) =>{
          return http.delete('/margin-price/' + params.priceId).then(res => {
              commit('setUserPricesAfterDelete', params)
          })
       },

addMarginPriceToUser: ({commit}, params) => {
    return http.post('/margin-price', params).then(res => {
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
  },
  mutations: {
      setUsersDataAfterClean(state, data) {
          let usersData = [...state.users]
          let newData = []
          usersData.forEach(u => {
              newData.push({...u, prices:[]})

          })
          state.users = newData
      },
      setUserPricesAfterDelete(state, data) {

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
          state.users = newData
      },
    setUsers(state, data) {
        let newArrUser = [...data]
        newArrUser.sort(function (a, b) {
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
      setUsersAfterUpdate(state, data) {
          let newArrUser = []
          state.users.forEach(u => {
              if (u.id=== data.id){
                  newArrUser.push(data)
              } else {
                  newArrUser.push({...u})
              }
          })

          newArrUser.sort(function (a, b) {
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
          let user = state.users.find(u => u.id === data.user_id)
          user.prices.push(data)
          let newArrUser = []
           state.users.forEach(u => {
             if (u.id === data.id ) {
                 newArrUser.push(data)
             }
             return newArrUser.push(u)
          })
          newArrUser.sort(function (a, b) {
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
          newArrUser.sort(function (a, b) {
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
  },
  getters: {
    users: state => state.users,
  }
}

export default users
