export default {
  getUserById: (state) => (id) => {
    return state.users.find((user) => user.id === id);
  },
};
