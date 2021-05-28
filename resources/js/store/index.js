import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/users'
import settings from "./modules/settings";
import tableLines from "./modules/tableLines";
Vue.use(Vuex)

const dataState = createPersistedState({
  paths: ['auth']
})

export default new Vuex.Store({
  modules: {
    auth: auth,
    users: users,
    settings,
    tableLines,
  },
  plugins: [dataState]
})
