export default {
  getSaleById: (state, getters) => (id) => {
    return state.sales.find((product) => product.id == id);
  },
};
