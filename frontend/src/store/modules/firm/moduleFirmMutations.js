export default {
  SET_FIRMS(state, payload) {
    state.firms = payload;
  },
  DELETE_FIRMS(state, payload) {
    state.firms = state.firms.filter((item) => item.id !== payload);
  },
  ADD_FIRMS(state, payload) {
    state.firms.push(payload);
  },

  UPDATE_FIRMS(state, payload) {
    // Find index
    const index = state.firms.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.firms.splice(index, 1, payload);
    }
  },
};
