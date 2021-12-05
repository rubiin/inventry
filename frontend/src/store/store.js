import { createStore } from 'vuex';
import moduleUser from './modules/user/moduleUser';
import moduleProduct from './modules/products/moduleProduct';
import moduleSales from './modules/sales/moduleSale';
import moduleFirm from './modules/firm/moduleFirm';
import moduleExpense from './modules/expense/moduleExpense';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    user: moduleUser,
    sales: moduleSales,
    products: moduleProduct,
    firm: moduleFirm,
    expense: moduleExpense,
  },
  plugins: [createPersistedState()],
});
