import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuthUser} from "@/stores/auth/useAuthUser";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            children: [
                {
                    path: '/diagnostics',
                    name: 'diagnostics',
                    component: () => import('../views/Diagnostics.vue'),
                    meta: {requiresAuth: true},
                },
                {
                    path: '/historic',
                    name: 'historic',
                    component: () => import('../views/Historic.vue'),
                    meta: {requiresAuth: true},
                },
            ],
        },

        {
            path: '/auth',
            name: 'auth',
            component: () => import('../views/Auth.vue'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('../views/Login.vue'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('../views/Register.vue'),
                }
            ],
        },

    ]
})

router.beforeEach((to) => {
    // ✅ This will work because the router starts its navigation after
    // the router is installed and pinia will be installed too
    const authUser = useAuthUser()

    if (authUser.isLoggedIn === false && to.meta.requiresAuth) return {name: 'login'}
})

export default router
