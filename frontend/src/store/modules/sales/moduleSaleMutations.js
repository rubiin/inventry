export default {
  SET_SALES(state, payload) {
    state.sales = payload;
  },
  SET_STATS(state, payload) {
    state.stats = payload;
  },
  DELETE_SALES(state, payload) {
    state.sales = state.sales.filter((item) => item.id !== payload);
  },
  ADD_SALES(state, payload) {
    state.sales.push(payload);
  },

  UPDATE_SALES(state, payload) {
    // Find index
    const index = state.sales.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.sales.splice(index, 1, payload);
    }
  },
};
