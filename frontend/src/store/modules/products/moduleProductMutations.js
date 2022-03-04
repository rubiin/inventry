export default {
  SET_PRODUCTS(state, payload) {
    state.products = payload;
  },
  DELETE_PRODUCTS(state, payload) {
    state.products = state.products.filter((item) => item.id !== payload);
  },
  ADD_PRODUCTS(state, payload) {
    state.products.push(payload);
  },

  UPDATE_PRODUCTS(state, payload) {
    // Find index
    const index = state.products.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.products.splice(index, 1, payload);
    }
  },
};
