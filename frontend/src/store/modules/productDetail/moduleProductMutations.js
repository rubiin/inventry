export default {
  SET_PRODUCT_DETAILS(state, payload) {
    state.productDetails = payload;
  },
  DELETE_PRODUCT_DETAILS(state, payload) {
    state.productDetails = state.productDetails.filter(
      (item) => item.id !== payload,
    );
  },
  ADD_PRODUCT_DETAILS(state, payload) {
    state.productDetails.push(payload);
  },

  UPDATE_PRODUCT_DETAILS(state, payload) {
    // Find index
    const index = state.productDetails.findIndex(
      (user) => user.id === payload.id,
    );

    if (index !== -1) {
      state.productDetails.splice(index, 1, payload);
    }
  },
};
