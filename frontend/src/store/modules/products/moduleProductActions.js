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

  updateAProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .patch('/product/' + data.id, data.data, data.config)
        .then((res) => {
          commit('UPDATE_PRODUCTS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  createProduct({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/product/', data.data, data.config)
        .then((res) => {
          commit('ADD_PRODUCTS', res.data);
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },

  deleteProduct({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .delete('/product/' + id)
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          return reject(err.response);
        });
    });
  },
};
