import axios from '../../../axios/axios';

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

  COMMIT_LOGGED_IN(state, payload) {
    localStorage.setItem('user', JSON.stringify(payload));
    localStorage.setItem('token', JSON.stringify(payload.accessToken));


    state.loggedInUser = payload;
  },
  UPDATE_USER(state, payload) {
    // Find index
    const index = state.users.findIndex((user) => user.id === payload.id);

    if (index !== -1) {
      state.users.splice(index, 1, payload);
    }
  },
};
