import { createStore } from 'vuex';
import moduleUser from './modules/user/moduleUser';
import moduleProduct from './modules/products/moduleProduct';
import moduleSales from './modules/sales/moduleSale';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    user: moduleUser,
    sales: moduleSales,
    products: moduleProduct,
  },
  plugins: [createPersistedState()],
});
