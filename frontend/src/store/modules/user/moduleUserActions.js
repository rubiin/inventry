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
};
