import state from './moduleFirmState';
import mutations from './moduleFirmMutations';
import actions from './moduleFirmActions';
import getters from './moduleFirmGetters';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
