import Vue from 'vue'
import VueRouter from 'vue-router'
import Students from '../views/Students'
import Login from "../views/Login"
import Index from "../views/Index"
import Home from "../views/Home"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/Index',
        component: Index,
        children: [
            {
                path: '/Index/Students',
                component: Students
            },
            {
                path: '/Index/Home',
                component: Home
            },
        ]
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next()
    }
    if (!window.sessionStorage.getItem('token') || window.sessionStorage.getItem('token') == '' || window.sessionStorage.getItem('token') == null || window.sessionStorage.getItem('token') == undefined) {
        next('/')
    }
    next()
})


export default router
