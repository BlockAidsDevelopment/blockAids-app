import {createRouter, createWebHistory} from "vue-router";
import Dashboard from "../views/Dashboard.vue"

import Signin from "../views/Signin.vue";
import AuthGuard from "@/guards/AuthGuard";
import GuestGuard from "@/guards/GuestGuard";
import Users from "@/views/Users/Users.vue";
import Specialists from "@/views/Specialists/Specialists.vue";
import Organizations from "@/views/Organizations/Organizations.vue";
import TaskTypes from "@/views/TaskTypes/TaskTypes.vue";
import UserEdit from "@/views/Users/UserEdit.vue";
import SpecialistsEdit from "@/views/Specialists/SpecialistsEdit.vue";
import TaskTypesEdit from "@/views/TaskTypes/TaskTypesEdit.vue";
import OrganizationsEdit from "@/views/Organizations/OrganizationsEdit.vue";

const routes = [
    {
        path: "/",
        name: "Signin",
        component: Signin,
        beforeEnter: GuestGuard,
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/users",
        name: "Users",
        component: Users,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/users/edit/:id",
        name: "Edit User",
        component: UserEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/specialists",
        name: "Specialists",
        component: Specialists,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/specialists/edit/:id",
        name: "Edit Specialist",
        component: SpecialistsEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/organizations",
        name: "Organizations",
        component: Organizations,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/organizations/edit/:id",
        name: "Edit Organizations",
        component: OrganizationsEdit,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/task-types",
        name: "Task Tapes",
        component: TaskTypes,
        beforeEnter: AuthGuard,
    },
    {
        path: "/dashboard/task-types/edit/:id",
        name: "Edit Task Type",
        component: TaskTypesEdit,
        beforeEnter: AuthGuard,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});

export default router;
