import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../auth/auth';

import DashboardLayout from '@/layout/DashboardLayout';
import AuthLayout from '@/layout/AuthLayout';

import Dashboard from '../views/Dashboard.vue';
import Icons from '../views/Icons.vue';
import Maps from '../views/Maps.vue';
import Profile from '../views/UserProfile.vue';
import Stock from '../views/Stock.vue';
import StockDetail from '../views/StockDetail.vue';

import Sale from '../views/Sales.vue';
import SaleDetail from '../views/SaleDetail.vue';

import Firm from '../views/Firm.vue';
import FirmDetail from '../views/FirmDetail.vue';

import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

import Expense from '../views/Expense.vue';
import ExpenseDetail from '../views/ExpenseDetail.vue';

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
        path: '/stock',
        name: 'stocks',
        components: { default: Stock },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/stock-detail',
        name: 'stock-detail',
        components: { default: StockDetail },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/firm',
        name: 'firm',
        components: { default: Firm },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/firm-detail',
        name: 'firm-detail',
        components: { default: FirmDetail },
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
      {
        path: '/expense',
        name: 'expense',
        components: { default: Expense },
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/expense-detail',
        name: 'expense-detail',
        components: { default: ExpenseDetail },
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
