import state from './moduleExpenseState';
import mutations from './moduleExpenseMutations';
import actions from './moduleExpenseActions';
import getters from './moduleExpenseGetters';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
