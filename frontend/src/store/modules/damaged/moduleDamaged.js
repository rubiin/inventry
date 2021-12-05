import state from './moduleDamagedState';
import mutations from './moduleDamagedMutations';
import actions from './moduleDamagedActions';
import getters from './moduleDamagedGetters';

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
