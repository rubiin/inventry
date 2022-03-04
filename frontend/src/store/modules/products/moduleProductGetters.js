export default {
  getProductById: (state, getters) => (id) => {
    return state.products.find((product) => product.id == id);
  },
};
