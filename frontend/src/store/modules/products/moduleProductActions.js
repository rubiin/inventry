import axios from '../../../axios/axios';

export default {
  getAllProducts({ commit }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get('/product' + params)
        .then((res) => {
          commit('SET_PRODUCTS', res.data.items);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
