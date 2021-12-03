import { createStore } from 'vuex';
import moduleUser from './modules/user/moduleUser';
import moduleProduct from './modules/products/moduleProduct';

export default createStore({
  modules: {
    user: moduleUser,
    products: moduleProduct,
  },
});
