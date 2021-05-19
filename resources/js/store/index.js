import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import Vuex from 'vuex'
import auth from './modules/auth'
import faq from './modules/faq'
import users from './modules/users'
import faqCategory from './modules/faqCategory'
import language from './modules/language'
import news from './modules/news'
import videos from './modules/videos'
import dynamicPage from './modules/dynamicPage'
import dynamicPageText from './modules/dynamicPageText'

Vue.use(Vuex)

const dataState = createPersistedState({
  paths: ['auth']
})

export default new Vuex.Store({
  modules: {
    auth: auth,
    language: language,
    faqCategory: faqCategory,
    faq: faq,
    news: news,
    users: users,
    videos: videos,
    dynamicPage: dynamicPage,
    dynamicPageText: dynamicPageText
  },
  plugins: [dataState]
})
