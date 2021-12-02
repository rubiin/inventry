export default {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  DELETE_USER(state, payload) {
    state.users = state.users.filter((item) => item.id !== payload);
  },
  ADD_USER(state, payload) {
    state.users.push(payload);
  },
  UPDATE_USER(state, payload) {
    // Find index
    const index = state.users.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.users.splice(index, 1, payload);
    }
  },
};
