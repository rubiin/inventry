export default {
  getDamagesById: (state, getters) => (id) => {
    return state.damaged.find((product) => product.id == id);
  },
};
