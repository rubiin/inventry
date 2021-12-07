export default {
  getproductDetailsById: (state, getters) => (id) => {
    return state.productDetails.find((product) => product.id == id);
  },
};
