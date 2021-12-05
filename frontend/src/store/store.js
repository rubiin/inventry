import { createStore } from 'vuex';
import moduleUser from './modules/user/moduleUser';
import moduleProduct from './modules/products/moduleProduct';
import moduleSales from './modules/sales/moduleSale';
import moduleFirm from './modules/firm/moduleFirm';
import moduleExpense from './modules/expense/moduleExpense';
import moduleDamaged from './modules/damaged/moduleDamaged';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    user: moduleUser,
    sales: moduleSales,
    products: moduleProduct,
    firm: moduleFirm,
    damages: moduleDamaged,
    expense: moduleExpense,
  },
  plugins: [createPersistedState()],
});
