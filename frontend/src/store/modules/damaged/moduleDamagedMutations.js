export default {
  SET_DAMAGES(state, payload) {
    state.damaged = payload;
  },
  DELETE_DAMAGES(state, payload) {
    state.damaged = state.damaged.filter((item) => item.id !== payload);
  },
  ADD_DAMAGES(state, payload) {
    state.damaged.push(payload);
  },

  UPDATE_DAMAGES(state, payload) {
    // Find index
    const index = state.damaged.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.damaged.splice(index, 1, payload);
    }
  },
};
