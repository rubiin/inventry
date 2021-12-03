import axios from '../../../axios/axios';

export default {
  signUp({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('user/', data)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('auth/login', data)
        .then((res) => {
          commit('COMMIT_LOGGED_IN', res.data.data);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
