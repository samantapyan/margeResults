import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import SignIn from '../components/pages/Auth/SignIn'
import ForgotPassword from '../components/pages/Auth/ForgotPassword'
import Dashboard from '../components/pages/Dashboard'
import NotFound from '../components/pages/404'

import AuthLayout from '../components/layouts/AuthLayout'
import IndexLayout from '../components/layouts/IndexLayout'
import middlewarePipeline from './middlewarePipeline'

import guest from './middleware/guest'
import auth from './middleware/auth'

Vue.use(VueRouter)

const index = new VueRouter({
    routes: [
        {
            path: '/auth',
            component: AuthLayout,
            name: 'auth',
            redirect: '/auth/sign-in',
            meta: {
                middleware: [
                    guest
                ]
            },
            children: [
                {
                    path: 'sign-in',
                    name: 'SignIn',
                    component: SignIn,
                    meta: {
                        middleware: [
                            guest
                        ]
                    }
                },
                {
                    path: 'forgot-password',
                    name: 'ForgotPassword',
                    component: ForgotPassword,
                    meta: {
                        middleware: [
                            guest
                        ]
                    }
                }
            ]
        },
        {
            path: '/',
            component: IndexLayout,
            meta: {
                middleware: [
                    auth
                ]
            },
            redirect: '/dashboard',
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: Dashboard,
                    meta: {
                        middleware: [
                            auth
                        ]
                    }
                },

                // {
                //     path: '/news',
                //     name: 'news',
                //     component: News,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/news/:id?',
                //     name: 'add_news',
                //     component: AddNews,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/videos',
                //     name: 'videos',
                //     component: Videos,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/video/:id?',
                //     name: 'add_video',
                //     component: AddVideos,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/dynamic-page',
                //     name: 'dynamic_page',
                //     component: DynamicPage,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/dynamic-page/:id?',
                //     name: 'dynamic_page_add',
                //     component: DynamicPageAdd,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/dynamic-page-text',
                //     name: 'dynamic_page_text',
                //     component: DynamicPageText,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/dynamic-page-text/:id?',
                //     name: 'dynamic_page_text_add',
                //     component: DynamicPageTextAdd,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/faq',
                //     name: 'faq',
                //     component: Faq,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/faq/:id',
                //     name: 'faq_store',
                //     component: AddFaq,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/faq-category',
                //     name: 'faq_category',
                //     component: FaqCategory,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/faq-category/:id',
                //     name: 'faq_category_store',
                //     component: AddFaqCategory,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/language',
                //     name: 'language',
                //     component: Language,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // },
                // {
                //     path: '/language/:id',
                //     name: 'language_add',
                //     component: AddLanguage,
                //     meta: {
                //         middleware: [
                //             auth
                //         ]
                //     }
                // }
            ]
        },
        {
            path: '*',
            component: NotFound,
            name: 'not-found'
        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    mode: 'history',
    linkActiveClass: 'active'
})

index.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default index
