import { createRouter, createWebHashHistory } from 'vue-router';
import { auth } from '../auth/auth';

import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';

import Dashboard from '../views/Dashboard.vue';
import Icons from '../views/Icons.vue';
import Maps from '../views/Maps.vue';
import Profile from '../views/UserProfile.vue';
import Product from '../views/Product.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        components: { default: Dashboard },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/icons',
        name: 'icons',
        components: { default: Icons },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/maps',
        name: 'maps',
        components: { default: Maps },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/profile',
        name: 'profile',
        components: { default: Profile },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/products',
        name: 'products',
        components: { default: Product },
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        components: { default: Login },
      },
      {
        path: '/register',
        name: 'register',
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (
//     to.matched.some(
//       (record) => record.meta.requiresAuth,
//     ) /*&& to.name !== 'page-login'*/
//   ) {
//     auth(to, from, next);
//   } else {
//     return next();
//   }
// });

export default router;
