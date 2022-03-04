export const auth = (to, from, next) => {
  const token = localStorage.getItem('accessToken');
  const publicPages = [
    '/login',
    '/forgot-password',
    '/verify-email/' + to.params.token,
    '/reset-password/' + to.params.token,
    '/pages/error-419',
    '/admin/login',
    '/success',
  ];
  const authRequired = !publicPages.includes(to.path);

  if (to.path === '/login') {
    if (token) {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      return next('dashboard');
    }
  }

  if (!authRequired && token) {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return next('/login');
    // }
  }

  if (authRequired && !token && to.name !== 'user-reset-password') {
    if (from.path !== '/admin/login') {
      return next('/login');
    }
  }

  return next();
};
