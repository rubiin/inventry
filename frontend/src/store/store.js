import { createStore } from 'vuex'
import moduleUser from'./modules/user/moduleUser';

export default createStore({
  modules: {
    user: moduleUser
  }
})