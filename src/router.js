import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import AuthenticationService from "@/services/AuthenticationService";

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            name: "home",
            redirect: { name: 'list_users' }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./components/Login"),
            beforeEnter: (to, from, next) => {
                if (AuthenticationService.isAuthenticated()) {
                    next('/');
                }
                next();
            }
        },
        {
            path: "/logout",
            name: "logout",
            component: () => import("./components/Logout")
        },
        {
            path: "/users",
            name: "list_users",
            component: () => import("./components/ListUsers"),
            beforeEnter: (to, from, next) => {
                if (!AuthenticationService.isAuthenticated()) {
                    next('/login');
                }
                next();
            }
        },
        {
            path: "/users/create",
            name: "create_user",
            component: () => import("./components/CreateUser"),
            beforeEnter: (to, from, next) => {
                if (!AuthenticationService.isAuthenticated()) {
                    next('/login');
                }
                next();
            }
        },
        {
            path: "/users/:id",
            name: "show_user",
            component: () => import("./components/ShowUser"),
            beforeEnter: (to, from, next) => {
                if (!AuthenticationService.isAuthenticated()) {
                    next('/login');
                }
                next();
            }
        }
    ]
});
