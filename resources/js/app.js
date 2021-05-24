//
//
// import  App from './views/app'
// const app = new Vue({
//     el: "#app",
//     components: {'app':App}
// });

import Vue from 'vue'
// import './scss/style.scss'
import App from './views/app.vue'
import i18n from './localization/i18n'
import router from './router/index.js'
import store from './store/index.js'
import { ValidationProvider, ValidationObserver, configure, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { BootstrapVue } from 'bootstrap-vue'
import Toasted from 'vue-toasted'
import Multiselect from 'vue-multiselect'
import CKEditor from 'ckeditor4-vue'

import VueTimepicker from 'vue2-timepicker'
Vue.use(VueTimepicker)

import { Datetime } from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)


import VueFilterDateFormat from 'vue-filter-date-format';

Vue.use(VueFilterDateFormat);

Vue.use(CKEditor)

Vue.component('multiselect', Multiselect)

Vue.use(BootstrapVue)
const moment = require('vue-moment');
Vue.use(moment)

// import VueMoment from 'vue-moment'
//
// import moment from 'moment-timezone'
//
// Vue.use(VueMoment, {
//     moment,
// })
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
configure({
    classes: {
        invalid: 'is-invalid'
    }
})
// install rules and localization
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule])
})
extend('positive', value => {
    if (value.slice(0, 24) >= 'https://www.youtube.com/') {
        return true
    }
})

Vue.use(Toasted, {
    type: ['success', 'error']
})

Vue.config.productionTip = false

new Vue({
    i18n,
    store,
    render: h => h(App),
    router: router
}).$mount('#app')
