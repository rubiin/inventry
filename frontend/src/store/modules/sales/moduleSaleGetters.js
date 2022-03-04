export default {
  getSaleById: (state, getters) => (id) => {
    return state.sales.find((product) => product.id == id);
  },
  getStats: (state, getters) => {
    return state.stats;
  },
};
