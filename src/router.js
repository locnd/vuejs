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
            component: () => import("./components/Auth/Login"),
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
            component: () => import("./components/Auth/Logout")
        },
        {
            path: "/users",
            name: "list_users",
            component: () => import("./components/User/ListUsers"),
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
            component: () => import("./components/User/CreateUser"),
            beforeEnter: (to, from, next) => {
                if (!AuthenticationService.isAuthenticated()) {
                    next('/login');
                }
                next();
            }
        },
        {
            path: "/users/:id",
            name: "edit_user",
            component: () => import("./components/User/EditUser"),
            beforeEnter: (to, from, next) => {
                if (!AuthenticationService.isAuthenticated()) {
                    next('/login');
                }
                next();
            }
        }
    ]
});
