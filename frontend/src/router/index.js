import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../auth/auth';

import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';

import Dashboard from '../views/Dashboard.vue';
import Icons from '../views/Icons.vue';
import Maps from '../views/Maps.vue';
import Profile from '../views/UserProfile.vue';
import Product from '../views/Product.vue';
import ProductDetail from '../views/ProductDetail.vue';

import Sale from '../views/Sales.vue';
import SaleDetail from '../views/SaleDetail.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '/',
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
        path: '/product-detail',
        name: 'product-detail',
        components: { default: ProductDetail },
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
      {
        path: '/sales',
        name: 'sales',
        components: { default: Sale },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/sale-detail',
        name: 'sale-detail',
        components: { default: SaleDetail },
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
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // alert('going to '+JSON.stringify(to));
  next();
});

export default router;
