import state from './moduleSaleState';
import mutations from './moduleSaleMutations';
import actions from './moduleSaleActions';
import getters from './moduleSaleGetters';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
