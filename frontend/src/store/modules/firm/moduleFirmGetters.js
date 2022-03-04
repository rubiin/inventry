export default {
  getFirmById: (state, getters) => (id) => {
    return state.firms.find((product) => product.id == id);
  },
};
