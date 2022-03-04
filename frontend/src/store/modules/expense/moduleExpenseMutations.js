export default {
  SET_EXPENSES(state, payload) {
    state.expenses = payload;
  },
  DELETE_EXPENSES(state, payload) {
    state.expenses = state.expenses.filter((item) => item.id !== payload);
  },
  ADD_EXPENSES(state, payload) {
    state.expenses.push(payload);
  },

  UPDATE_EXPENSES(state, payload) {
    // Find index
    const index = state.expenses.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.expenses.splice(index, 1, payload);
    }
  },
};
