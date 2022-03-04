export default {
  getExpenseById: (state, getters) => (id) => {
    return state.expenses.find((product) => product.id == id);
  },
};
